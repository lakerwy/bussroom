import { filterDict } from "@/utils/utils.js";
import {infoTypeList} from "@/utils/const/attention";

/**
 * 设置表格列表享
 * @param _this
 * @param isTeam 0我的 1我的团队
 * @param type 1招标与采购 2拟在建项目
 */
export const setColumn = function (_this, isTeam, type){
    let arr = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: "重要程度",
            align: "center",
            minWidth: 80,
            key: "signFlag",
            render: (h, params) => {
                let value = params.row.signFlag == 1?"重要": "一般";
                return(
                    <div>
                        {value}
                    </div>
                )
            }
        },
        {
            title: "信息类型",
            align: "center",
            minWidth: 80,
            key: "infoType",
            render: (h, params) => {
                let value = filterDict(params.row.infoType, infoTypeList, {labelKey: 'label', valueKey: 'value'})
                return (
                    <div>{value}</div>
                )
            }
        },
        {
            title: "项目类型",
            align: "center",
            minWidth: 120,
            key: "infoType",
            render: (h, params) => {
                let value = filterDict(params.row.infoType, infoTypeList, {labelKey: 'label', valueKey: 'value'})
                return (
                    <div>{value}</div>
                )
            }
        },
        {
            title: "标题",
            align: "center",
            minWidth: 380,
            key: "title",
            render: (h, params)=>{
                return (
                    <a target="_blank"
                       href={params.row.webUrl}
                       class="infoTitle"
                    >{params.row.title}</a>
                )
            }
        },
        {
            title: "项目进展阶段",
            key: "date1",
            align: "center",
            minWidth: 200,
        },
        {
            title: "地区",
            align: "center",
            minWidth: 120,
            key: "areaName"
        },
        {
            title: "发布时间",
            align: "center",
            minWidth: 120,
            key: "publishDate"
        },
        {
            title: "收藏时间",
            align: "center",
            minWidth: 120,
            key: "createTime"
        },
        {
            title: "收藏人",
            align: "center",
            minWidth: 120,
            key: "name",
            filters: [
                { label: '小王', value: 1 },
                { label: '小马', value: 2 },
                { label: '小刘', value: 3 },
            ],
            filterMultiple: false,
            filterMethod (value, row) {
                console.log(1111)
            }
        },
    ]
    if (type == 1){
        arr = arr.filter(col => col.title !== '项目类型' && col.title !== '项目进展阶段' )
    } else {
        arr = arr.filter(col => col.title !== '信息类型' )
    }
    if (isTeam == 0){
        arr = arr.filter(col => col.key !== 'name' )
    }
    return arr
}