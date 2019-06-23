<template>
    <div>
        <table border="1" cellspacing="0" width="200px;">
            <tr>
                <td>百度</td>
                <td>百度</td>
            </tr>
            <tr>
                <td>23232</td>
                <td>百度</td>
                <td>323</td>
            </tr>
            <tr>
                <td>32</td>
                <td>百度</td>
                <td>百度</td>
            </tr>
        </table> 
    </div>
</template>
<script>
export default {
    name: 'table',
    props:{
        type:{
            tableData:String,
            default:''
        }
    },
    data(){
    return{
        tableData: [
          ]
    }
    },
   
   
}
</script>