import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pxtovw from 'postcss-px-to-viewport'
import path from 'path'
const loder_pxtovw = pxtovw({
    unitToConvert: 'px', // 需要转换的单位，默认为"px"
    viewportWidth: 1280, // 设计稿的视口宽度
    unitPrecision: 1, // 单位转换后保留的精度
    propList: ['*'], // 能转化为vw的属性列表
    viewportUnit: 'vw', // 希望使用的视口单位
    fontViewportUnit: 'vw', // 字体使用的视口单位
    selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
    // minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
    mediaQuery: true, // 媒体查询里的单位是否需要转换单位
    replace: true, //  是否直接更换属性值，而不添加备用属性
    exclude: [/node_modules/, /ruler/, /exerciseRuler/, /selectData/], // 忽略某些文件夹下的文件或特定文件
    include: /\/src\/views\//, // 如果设置了include，那将只有匹配到的文件才会被转换，例如只转换 'src/mobile' 下的文件 (include: /\/src\/mobile\//)
    landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
    landscapeUnit: 'vw', // 横屏时使用的单位
    landscapeWidth: 1280 // 横屏时使用的视口宽度
})
export default defineConfig(({ command, mode }) => {
    return {
        plugins: [vue()],
        // publicPath
        server: {
            port: 8086,
            // host:"",
            open: true,
            proxy: {
                '/api': {
                    target: 'http://192.168.50.199:8070/zskj/app',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src")
            }
        },
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        'primary-color': '#3D7EFF',
                        'link-color': '#3D7EFF',
                        'border-radius-base': '2px',
                    },
                    javascriptEnabled: true,
                },
            },
            postcss: {
                plugins: [loder_pxtovw]
            }
        },
        base: './',
        build: {
            outDir: 'dist',
            sourcemap: false,
            minify: 'terser',
            chunkSizeWarningLimit: 1500,
            emptyOutDir: true,
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            },
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    },
                    chunkFileNames: (chunkInfo) => {
                        const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
                        const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
                        return `js/${fileName}/[name].[hash].js`;
                    }
                }
            }
        },
    }
})
