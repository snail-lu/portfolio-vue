export default {
    components: {
    },
    data() {
        return {
            isChecked: true
        }
    },
    methods: {
        checkPassword() {
            this.$prompt('请输入密码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then((val) => {
                if(val.value=="668812"){
                    this.$message({
                        type: 'success',
                        message: '校验成功！'
                    });
                    this.isChecked = true;
                } else {
                    this.$message({
                        type: 'error',
                        message: '密码错误！'
                    })
                }

            }).catch(() => {
                this.$message({
                  type: 'error',
                  message: '取消输入！'
                });       
            });
        }
    },
    mounted () {
        // this.checkPassword();
    },
};