<template>
<h1>留言板</h1>
<div class="bar" v-show="!isShowLoginBar">
    <button @click="openLogin">登入</button> <button @click="openRegister">註冊</button>
</div>
<div class="bar_login" v-show="isShowLoginBar">
    歡迎使用者{{name}}登入 <button @click="logout">登出</button><br>
    <button @click="createDiv">新增留言</button>
</div>
<div class="register" v-show="isShowRegister">
    註冊 <button @click="close">關閉註冊</button><br>
    <form method="post" @submit.prevent="handleRegister">
    名字:<input type="text" v-model="name" required><br>
    電子信箱:<input type="email" v-model="email" required><br>
    密碼:<input type="password" v-model="password" required><br>
    再次確認密碼:<input type="password" v-model="password_confirmation" required><br>
    <input type="submit"> <input type="reset">
    </form>
</div>
<div class="login" v-show="isShowLogin">
    登入 <button @click="close">關閉登入</button><br>
    <form method="post" @submit.prevent="handleLogin">
    電子信箱:<input type="email" v-model="email" required><br>
    密碼:<input type="password" v-model="password" required><br>
    <input type="submit"> <input type="reset">
    </form>
</div>
<div class="create" v-show="isShowCreate">
    <form method="post" @submit.prevent="handleCreate">
    使用者:{{name}}<br>
    內容:<input type="text" v-model="content" required><br>
    <input type="submit" value="確認新增"> <input type="reset"> <button @click="close">關閉</button><br>
    </form>
</div>
<div class="update" v-show="isShowUpdate">
    <form method="post" @submit.prevent="handleUpdate">
    使用者:{{name}}<br>
    內容:<input type="text" v-model="content" required><br>
    <input type="submit" value="確認修改"> <input type="reset"> <button @click="close">關閉</button><br>
    </form>
</div>
<div class="msgCls" v-for="item in msg">使用者:{{item.name}}<br>
建立時間:{{item.created_at}}更新時間:{{item.updated_at}}<br>
留言:{{item.content}}<br>
<button v-show="isShowUpdateDelete" @click="updateDiv(item)">修改</button> <button v-show="isShowUpdateDelete" @click="handleDelete(item)">刪除</button></div>
</template>
    
<script>
import axios from 'axios'
import { toRaw } from 'vue'
export default{
    data(){
       
    return{
        isShowRegister: false,
        isShowLogin: false,
        isShowLoginBar: false,
        isShowCreate: false,
        isShowUpdateDelete: false,
        isShowUpdate: false,
        name:"",
        email:"",
        password:"",
        password_confirmation:"",
        content:"",
        msg:[],
        info:{},
        token:"",
        item:{}
        }
    },
    methods:{
        openLogin(){
            this.isShowLogin = true
            this.isShowRegister = false
        },
        openRegister(){
            this.isShowLogin = false
            this.isShowRegister = true
        },
        close(){
            this.isShowRegister=false
            this.isShowLogin=false
            this.isShowCreate=false
            this.isShowUpdate=false
        },
        handleLogin(){
            axios.post('http://localhost:8000/api/login',{
                email:this.email,
                password:this.password,
            })
            .then((res) =>  {
                console.log(res)
                // this.info=res.data
                this.info=toRaw(res.data)
                this.name=this.info.user.name
                this.token=this.info.token
                this.isShowLogin=false
                this.isShowLoginBar=true
                this.isShowUpdateDelete=true
           
            }).catch((error) => {
                console.log(error)
                alert('電子郵件或密碼錯誤')
            })
        },
        handleRegister(){
            axios.post('http://localhost:8000/api/register',{
                name:this.name,
                email:this.email,
                password:this.password,
                password_confirmation:this.password_confirmation
            })
            .then((res) =>  {
                console.log(res)
                // this.info=res.data
                this.info=toRaw(res.data)
                this.name=this.info.user.name
                this.token=this.info.token
                this.isShowRegister=false
                this.isShowLoginBar=true
                this.isShowUpdateDelete=true

            }).catch((error) => {
                console.log(error)
            })
        },
        logout(){
            const token = this.token
            let this_ = this;
            axios({
                method: 'POST',
                url: 'http://localhost:8000/api/logout',
                responseType: 'json', // responseType 也可以寫在 header 裡面
                headers: {
                    Authorization: `Bearer ${token}` // Bearer 跟 token 中間有一個空格
                }
            })
            .then(function (response) {
                console.log(response)
                this_.isShowLoginBar=false
                this_.isShowCreate=false
                this_.isShowUpdateDelete=false
                this_.isShowUpdate = false
            })
            .catch(function (error) {
                console.log(error)
            });
        },
        createDiv(){
            this.isShowCreate = !this.isShowCreate
            this.isShowUpdate = false
        },
        handleCreate(){
            const token = this.token
            let this_ = this;
            axios({
                method: 'POST',
                url: 'http://localhost:8000/api/messages',
                data:{
                    user_id: this_.info.user.id,
                    name: this_.name,
                    content: this_.content,
                },
                responseType: 'json', // responseType 也可以寫在 header 裡面
                headers: {
                    Authorization: `Bearer ${token}` // Bearer 跟 token 中間有一個空格
                }
            })
            .then(function (response) {
                console.log(response)
                this_.isShowCreate=false

                axios.get('http://localhost:8000/api/messages')
                    .then((res) =>  {
                    this_.msg = res.data
                    }).catch((error) => {
                    console.log(error)
                })
            })
            .catch(function (error) {
                console.log(error)
            });
        },
        updateDiv(item){
            this.isShowCreate = false
            if(item.user_id != this.info.user.id){
                alert('不可修改別人的留言')
                return
            }
            this.isShowUpdate = true
            this.content = item.content
            this.item = item
        },
        handleUpdate(){
            const token = this.token
            let this_ = this;
            axios({
                method: 'PUT',
                url: 'http://localhost:8000/api/messages/'+this_.item.id,
                data:{
                    content: this_.content,
                },
                responseType: 'json', // responseType 也可以寫在 header 裡面
                headers: {
                    Authorization: `Bearer ${token}` // Bearer 跟 token 中間有一個空格
                }
            })
            .then(function (response) {
                console.log(response)
                this_.isShowUpdate = false

                axios.get('http://localhost:8000/api/messages')
                    .then((res) =>  {
                    this_.msg = res.data
                    }).catch((error) => {
                    console.log(error)
                })

            })
            .catch(function (error) {
                console.log(error)
            });
        },
        handleDelete(item){
            this.isShowCreate = false
            this.isShowUpdate = false
            if(item.user_id != this.info.user.id){
                alert('不可刪除別人的留言')
                return
            }
            
            const token = this.token
            let this_ = this;

            var r=confirm("是否要刪除");
			if (r==true){
                axios({
                method: 'DELETE',
                url: 'http://localhost:8000/api/messages/'+item.id,
                data:{
                    content: this_.content,
                },
                responseType: 'json', // responseType 也可以寫在 header 裡面
                headers: {
                    Authorization: `Bearer ${token}` // Bearer 跟 token 中間有一個空格
                }
                })
                .then(function (response) {
                    console.log(response)

                    axios.get('http://localhost:8000/api/messages')
                    .then((res) =>  {
                    this_.msg = res.data
                    }).catch((error) => {
                    console.log(error)
                    })

                })
                .catch(function (error) {
                    console.log(error)
                });
			}
			else{
                return
			}
        }
    },
    mounted:function(){
        axios.get('http://localhost:8000/api/messages')
        .then((res) =>  {
             this.msg = res.data
        }).catch((error) => {
        console.log(error)
        })
    }
}
</script>
<style scoped>
.msgCls{
    border-style:solid;
    background-color:gray;
}
</style>