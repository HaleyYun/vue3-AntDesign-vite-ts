<template>
    <div class="content">
        <div  class="con" v-html="data"></div>
    </div> 
</template>
<script>
import { reactive, toRefs, watch,defineExpose  } from "vue";
import { useState } from '@/stores/state';
const cftState = useState();
export default {
    props: {
        data: {
            type: String,
            required: true,
        },
    },
    setup(props ) {
        const state = reactive({

        })
        return {
            ...toRefs(state)
        };
    },
}

</script>

<style lang='css' scoped>
    .content {
        width: auto;
        height: 100%;
        background: #FFFFFF;
        border-radius: 16px;
        box-sizing: border-box;
    }
    .con{
        height:630px;
    }
</style>