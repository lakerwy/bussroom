/**
 * 一些公共的label和value
 *
 */
export const infoTypeList = [
    {label: '工程招标', value: 1},
    {label: '货物招标', value: 2},
    {label: '服务招标', value: 3},
    {label: '中标公示', value: 4},
    {label: '招标预告', value: 5},
    {label: '政府采购', value: 6},
    {label: '企业采购', value: 7},
    {label: 'VIP项目', value: 3030},
    {label: '项目核准批复', value: 3020},
    {label: '项目动态', value: 3050},
    {label: '项目跟踪', value: 3070},
    {label: '招标全部', value: 1000},
    {label: '拟在建全部', value: 2000},
]

//栏目类型
export const columnType = [
    {label: '全部', value: 0},
    {label: '工程招标', value: 1},
    {label: '货物招标', value: 2},
    {label: '服务招标', value: 3},
    {label: '政府采购', value: 6},
    {label: '企业采购', value: 7},
    {label: '招标预告', value: 5},
    {label: '中标公示', value: 4},
]

//内容范围
export const contentRange = [
    {label: '全部', value: 1},
    {label: '标题', value: 2},
    {label: '正文', value: 3},
    {label: '附件', value: 4},
]

//信息类型
export const informationType = [
    {label: '全部', value: 0},
    {label: 'VIP项目', value: 3030},
    {label: '项目备案核准', value: 3020},
    {label: '项目动态', value: 3050},
    {label: '项目跟踪', value: 3070},
]

//项目阶段
export const projectPhase = [
    {value: 1, label: '全部阶段'},
    {value: 2, label: '项目建议书阶段'},
    {value: 3, label: '可行性研究报告阶段'},
    {value: 4, label: '项目审批核查'},
    {value: 5, label: '工程设计'},
    {value: 6, label: '施工准备'},
    {value: 7, label: '在建阶段'},
]

//时间
export const timeRange = [
    {label: '昨日', value: 0},
    {label: '近一周', value: 1},
    {label: '近两周', value: 2},
    {label: '近一个月', value: 3},
    {label: '近三个月', value: 4},
    {label: '近一年', value: 5},
    {label: '自定义时间', value: -1},
]

//地区
export const regionData= [
    {
        label: "全选",
        id: -1,
        children: [
            {
                label: "华北",
                id: -11,
                children: [
                    {
                        label: "北京",
                        id: 1,
                    },
                    {
                        label: "天津",
                        id: 3,
                    },
                    {
                        label: "河北",
                        id: 5,
                    },
                    {
                        label: "山西",
                        id: 6,
                    },
                    {
                        label: "内蒙古",
                        id: 7,
                    },
                ],
            },
            {
                label: "华东",
                id: -12,
                children: [
                    {
                        label: "上海",
                        id: 2,
                    },
                    {
                        label: "山东",
                        id: 16,
                    },
                    {
                        label: "江苏",
                        id: 11,
                    },
                    {
                        label: "安徽",
                        id: 13,
                    },
                    {
                        label: "江西",
                        id: 15,
                    },
                    {
                        label: "浙江",
                        id: 12,
                    },
                    {
                        label: "福建",
                        id: 14,
                    },
                ],
            },
            {
                label: "华中",
                id: -13,
                children: [
                    {
                        label: "湖北",
                        id: 18,
                    },
                    {
                        label: "湖南",
                        id: 19,
                    },
                    {
                        label: "河南",
                        id: 17,
                    },
                ],
            },
            {
                label: "华南",
                id: -14,
                children: [
                    {
                        label: "广东",
                        id: 20,
                    },
                    {
                        label: "广西",
                        id: 21,
                    },
                    {
                        label: "海南",
                        id: 22,
                    },
                ],
            },
            {
                label: "东北",
                id: -15,
                children: [
                    {
                        label: "辽宁",
                        id: 8,
                    },
                    {
                        label: "吉林",
                        id: 9,
                    },
                    {
                        label: "黑龙江",
                        id: 10,
                    },
                ],
            },
            {
                label: "西北",
                id: -16,
                children: [
                    {
                        label: "陕西",
                        id: 26,
                    },
                    {
                        label: "甘肃",
                        id: 28,
                    },
                    {
                        label: "宁夏",
                        id: 31,
                    },
                    {
                        label: "新疆",
                        id: 30,
                    },
                    {
                        label: "青海",
                        id: 29,
                    },
                ],
            },
            {
                label: "西南",
                id: -17,
                children: [
                    {
                        label: "重庆",
                        id: 4,
                    },
                    {
                        label: "四川",
                        id: 27,
                    },
                    {
                        label: "贵州",
                        id: 23,
                    },
                    {
                        label: "云南",
                        id: 24,
                    },
                    {
                        label: "西藏",
                        id: 25,
                    },
                ],
            },
            {
                label: "其他",
                id: -18,
                children: [
                    {
                        label: "跨省",
                        id: 36,
                    },
                    {
                        label: "香港",
                        id: 32,
                    },
                    {
                        label: "澳门",
                        id: 33,
                    },
                    {
                        label: "台湾",
                        id: 34,
                    },
                ],
            },
        ],
    },
]
