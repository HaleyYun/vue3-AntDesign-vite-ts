import { defineStore } from 'pinia'
import { message } from 'ant-design-vue';
import { loginAPI, loginOut, menuApi } from "@/apis/login"
import { userInfoReponseData, loginFormData } from '@/apis/login/type';
import { ref } from 'vue';
import router from '@/router';

import { personInfo } from "@/apis/user/index"
import { personInfoType } from '@/apis/user/type';

// import {getPhoneInfo,showLog} from "@/utils/voice"
import { getPhoneInfo } from "@/utils/voice"

export const useUserStore = defineStore('user', () => {

  const userInfor = ref<userInfoReponseData>()

  const personInfor = ref<personInfoType>({
    "empCode": '',
    "name": '',
    "sex": 1,
    "phone": '',
    "birthDate": '',
    "pictureUrl": '',
    "channelCode": '',
    "permissions": 0
  })
  // 登录获取token
  const getUserInfo = async (options: loginFormData) => {
    //获取设备信息
    try {
      getPhoneInfo(async (data: any) => {
        // message.success(data)
        let obj = JSON.parse(data)
        options.appVersion = obj.appVersion;
        options.deviceId = obj.deviceId || "";
        options.manufacturer = obj.manufacturer;
        options.model = obj.model;
        options.osVersion = obj.osVersion;
        options.resolutionX = obj.resolutionX;
        options.resolutionY = obj.resolutionY;

        const res = await loginAPI(options)
        // const router =useRouter();
        if (res.code === 200) {
          console.log(options)
          reMember(options.memoryPassword, options.username, options.password)
          userInfor.value = res.data
          menuApi().then((res) => {
            localStorage.setItem('menu', JSON.stringify(res.data.tproDispositionResponse))
            console.log(localStorage.getItem('menu'))
            router.push({
              path: res.data.tproDispositionResponse[0].path
            })
          })

          //获取个人其他信息
          const person = await personInfo({})
          if (person.code === 200) {
            personInfor.value = person.data
          }
          message.success("登录成功")
          return
        }

      })
      // showLog(JSON.stringify(options))
    } catch (error) {
      console.log(error)
      options.appVersion = 12
      options.deviceId = ""
      options.manufacturer = ''
      options.model = '';
      options.osVersion = '1.2'
      options.resolutionX = 500;
      options.resolutionY = 6000;
      const res = await loginAPI(options)
      // const router =useRouter();
      if (res.code === 200) {
        menuApi().then((res) => {
          localStorage.setItem('menu', JSON.stringify(res.data.tproDispositionResponse))
          console.log(localStorage.getItem('menu'))
          router.push({
            path: res.data.tproDispositionResponse[0].path
          })
        })
        userInfor.value = res.data
        if (res.data?.msg) {
          message.success(res.data?.msg);
        } else {
          message.success("登录成功");
        }
        //获取个人其他信息
        const person = await personInfo({})
        if (person.code === 200) {
          personInfor.value = person.data
        }
        return

      }
    }





  }
  const emptyUserInfor = async () => {
    userInfor.value = <userInfoReponseData>{}
  }

  // 记住密码
  const reMember = (remember: boolean, name: string, pas: string) => {
    if (remember) {
      // 使用cookie保存账号和密码
      localStorage.setItem('username', name)
      localStorage.setItem('password', pas)
      localStorage.setItem('memoryPassword', String(remember))
    } else {
      localStorage.setItem('username', '')
      localStorage.setItem('password', '')
      // 如果用户不勾选记住密码，则清除cookie或localStorage中的账号和密码
    }
  }

  // 退出登录
  const clearUserInfor = async () => {
    //同时调后端接口登出
    const res = await loginOut()
    if (res.code === 200) {
      userInfor.value = <userInfoReponseData>{}
      router.push('/login')
      message.success("退出成功");
      return

    } else {
      message.error(res.msg);
    }
  }

  //更新个人信息
  const updatePersonInfo = async (person: any) => {
    // console.log('到这里了')
    // console.log(person)
    personInfor.value.birthDate = person.birthDate
    personInfor.value.name = person.name
    personInfor.value.sex = person.sex
    personInfor.value.phone = person.phone
    personInfor.value.pictureUrl = person.pictureUrl

  }




  return {
    userInfor,
    personInfor,
    getUserInfo,
    clearUserInfor,
    updatePersonInfo,
    emptyUserInfor
  }
}, {
  persist: true,
})

