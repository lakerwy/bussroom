export const setColumn = function (_this){
    let arr = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: "订阅器名称",
            align: "center",
            minWidth: 120,
            key: "name"
        },
        {
            title: "订阅词",
            align: "center",
            minWidth: 120,
        },
        {
            title: "订阅逻辑",
            align: "center",
            minWidth: 120,
        },
        {
            title: "排除词",
            align: "center",
            minWidth: 120,
        },
        {
            title: "栏目类型",
            align: "center",
            minWidth: 120,
        },
        {
            title: "内容范围",
            align: "center",
            minWidth: 120,
        },
        {
            title: "地区",
            align: "center",
            minWidth: 120,
        },
        {
            title: "短信订阅",
            align: "center",
            minWidth: 120,
            key: "opne",
            render: (h, params) => _this.renderSwitch(params.row.opne)
        },
        {
            title: "邮件订阅",
            align: "center",
            minWidth: 120,
            key: "opne",
            render: (h, params) => _this.renderSwitch(params.row.opne)
        },
        {
            title: "微信订阅",
            align: "center",
            minWidth: 120,
            key: "opne",
            render: (h, params) => _this.renderSwitch(params.row.opne)
        },
        {
            title: "APP订阅",
            align: "center",
            minWidth: 120,
            key: "opne",
            render: (h, params) => _this.renderSwitch(params.row.opne)
        },
        {
            title: "操作",
            align: "left",
            minWidth: 200,
            render:(h,params) => {
                return(
                    <div class="operaBtn">
                        <span onClick={()=>_this.editSub(params)}>修改</span>
                        <span>删除</span>
                        <span>分享</span>
                    </div>
                )
            }
        },
    ]
    return arr
}
