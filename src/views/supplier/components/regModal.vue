<template>
  <div class="bidFormeModal">
    <Modal
      class="regOnline"
      :transfer="false"
      title="在线报名"
      v-model="modal"
      :width="600"
      :footer-hide="true"
      mask-closable
    >
      <span class="tips">报名须知：报名信息务必真实，以便及时联系</span>
      <Form
        :model="formData"
        :label-width="80"
        ref="form"
        :rules="ruleValidate"
      >
        <div class="setup1" v-show="!setup">
          <!-- 公司名称 -->
          <FormItem class="companyName" label="公司名称" prop="companyName">
            <Input
              v-model="formData.companyName"
              :disabled="disabled"
              placeholder="请输入公司名称"
            ></Input>
          </FormItem>
          <!-- 公司所在地 -->
          <FormItem
            class="companyAddress"
            label="公司所在地"
            prop="companyAddress"
          >
            <Cascader
              :data="areaData"
              :disabled="disabled"
              v-model="formData.companyAddress"
            ></Cascader>
          </FormItem>
          <!-- 所属行业 -->
          <FormItem class="Industry" label="所属行业" prop="Industry">
            <Cascader
              :data="IndustryData"
              :disabled="disabled"
              v-model="formData.Industry"
            ></Cascader>
          </FormItem>
          <!-- 主营业务 -->
          <FormItem class="mainBusiness" label="主营业务" prop="mainBusiness">
            <ul>
              <li
                v-for="(item, index) in mainBusinessList"
                :key="index"
                @mouseenter="item.mouse = true"
                @mouseleave="item.mouse = false"
                :style="
                  mainBusinessList.length > 2 ? { marginBottom: '15px' } : ''
                "
              >
                <div v-if="item.edit">
                  <span @click="editCurrent(index, item.name)">{{
                    item.name
                  }}</span>
                  <Icon
                    type="md-close"
                    size="16"
                    v-show="item.mouse"
                    @click="deleteMainBusiness(index, item.name)"
                  />
                  <span></span>
                </div>
                <Input
                  v-else
                  ref="input"
                  type="text"
                  :maxlength="10"
                  v-model="item.name"
                  @on-blur="editFinished(index)"
                />
              </li>
              <div
                v-show="mainBusinessList.length <= 14"
                class="add"
                @click="addMainBusiness"
              >
                <Icon type="md-add" :size="18" />
              </div>
            </ul>
          </FormItem>
          <!-- 注册地址 -->
          <FormItem
            class="registeredAddress notRequired"
            label="注册地址"
            prop="registeredAddress"
          >
            <Input
              v-model="formData.registeredAddress"
              placeholder="请输入公司详细地址"
            ></Input>
          </FormItem>
          <!-- 注册资金 -->
          <FormItem
            class="registeredFund"
            label="注册资金"
            prop="registeredFund"
          >
            <Input
              type="number"
              v-model="formData.registeredFund"
              placeholder="请输入注册资金，如1000"
            ></Input>
          </FormItem>
          <!-- 成立时间 -->
          <FormItem class="publicTime notRequired" label="成立时间">
            <template>
              <DatePicker
                type="date"
                :value="formData.publicTime"
                placeholder="2022-4-15"
                :options="publicTimeOption"
                style="width: 352px"
                @on-change="changePublicDate"
              ></DatePicker>
            </template>
          </FormItem>
          <!-- 公司规模 -->
          <FormItem class="companyScale" label="公司规模" prop="companyScale">
            <Select
              style="width: 200px"
              placeholder="请选择公司规模"
              v-model="formData.companyScale.value"
            >
              <Option
                v-for="item in companyScale"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </FormItem>
          <!-- 经营模式 -->
          <FormItem class="companyScale" label="经营模式" prop="businessModel">
            <Select
              style="width: 200px"
              v-model="formData.businessModel.value"
              placeholder="请选择公司经营模式"
            >
              <Option
                v-for="item in businessModelList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </FormItem>
          <!-- 公司法人 -->
          <FormItem
            class="registeredFund legalPerson"
            label="公司法人"
            prop="legalPerson"
          >
            <Input
              v-model="formData.legalPerson"
              placeholder="请输入公司法人姓名 "
            ></Input>
          </FormItem>

          <!-- 营业执照 -->
          <FormItem
            class="businessLicense"
            label="营业执照"
            prop="businessLicense"
          >
            <div class="uploadList">
              <Upload
                ref="businessLicenseUpload"
                :show-upload-list="false"
                :on-success="businessLicensehandleSuccess"
                :format="['jpg', 'jpeg', 'png']"
                :max-size="5120"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                :data="{ sid: this.id, type: 301 }"
                :action="this.uploadUrl"
                style="display: inline-block; width: 58px"
              >
                <div style="width: 58px; height: 58px; line-height: 58px">
                  <Icon type="md-add" size="47" style="color: #d2d2d2"></Icon>
                  <span>上传</span>
                </div>
              </Upload>
              <div
                class="demo-upload-list"
                v-for="(item, index) in businessLicenseUploadList"
                :key="index"
              >
                <template v-if="item.status === 'finished'">
                  <img :src="item.response.data.fileUrl" />
                  <div class="demo-upload-list-cover">
                    <Icon
                      type="ios-eye-outline"
                      @click="handleView(item.response.data.fileUrl)"
                    ></Icon>
                  </div>
                  <Icon
                    type="ios-close-circle"
                    style="color: #a4a3a3"
                    size="15"
                    @click="businessLicensehandleRemove(item)"
                  ></Icon>
                </template>
                <template v-else>
                  <Progress
                    v-if="!item.showProgress"
                    :percent="item.percentage"
                    hide-info
                  ></Progress>
                </template>
              </div>
            </div>
            <p class="tips">
              支持<span class="red">JPG、JPEG、PNG</span>格式大小不超过<span
                class="red"
                >5M</span
              >
            </p>
          </FormItem>
          <!-- 其他资质证书或特许经营许可证 -->
          <FormItem
            class="businessLicense otherCertificates"
            label="其他资质证书或特许经营许可证"
          >
            <div class="uploadList">
              <Upload
                ref="otherCertificatesUpload"
                :show-upload-list="false"
                :on-success="otherCertificateshandleSuccess"
                :format="['jpg', 'jpeg', 'png']"
                :max-size="5120"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                multiple
                type="drag"
                :data="{ sid: this.id, type: 302 }"
                :action="this.uploadUrl"
                style="display: inline-block; width: 58px"
              >
                <div style="width: 58px; height: 58px; line-height: 58px">
                  <Icon type="md-add" size="47" style="color: #d2d2d2"></Icon>
                  <span>上传</span>
                </div>
              </Upload>
              <div
                class="demo-upload-list"
                :style="
                  otherCertificatesList.length > 5
                    ? { marginBottom: '15px' }
                    : ''
                "
                v-for="(item, index) in otherCertificatesList"
                :key="index"
              >
                <template v-if="item.status === 'finished'">
                  <img :src="item.response.data.fileUrl" />
                  <div class="demo-upload-list-cover">
                    <Icon
                      type="ios-eye-outline"
                      @click="handleView(item.response.data.fileUrl)"
                    ></Icon>
                  </div>
                  <Icon
                    type="ios-close-circle"
                    style="color: #a4a3a3"
                    size="15"
                    @click="otherCertificateshandleRemove(item)"
                  ></Icon>
                </template>
                <template v-else>
                  <Progress
                    v-if="item.showProgress"
                    :percent="item.percentage"
                    hide-info
                  ></Progress>
                </template>
              </div>
            </div>
            <p class="tips">
              支持<span class="red">JPG、JPEG、PNG</span>格式大小不超过<span
                class="red"
                >5M</span
              >
            </p>
          </FormItem>

          <!-- 公司环境 -->
          <FormItem class="businessLicense otherCertificates" label="公司环境">
            <div class="uploadList">
              <Upload
                ref="environmentUpload"
                :show-upload-list="false"
                :on-success="environmenthandleSuccess"
                :format="['jpg', 'jpeg', 'png']"
                :max-size="5120"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                multiple
                type="drag"
                :data="{ sid: this.id, type: 303 }"
                :action="this.uploadUrl"
                style="display: inline-block; width: 58px"
              >
                <div style="width: 58px; height: 58px; line-height: 58px">
                  <Icon type="md-add" size="47" style="color: #d2d2d2"></Icon>
                  <span>上传</span>
                </div>
              </Upload>
              <div
                class="demo-upload-list"
                v-for="(item, index) in corporateEnvironmentList"
                :key="index"
                :style="
                  corporateEnvironmentList.length > 5
                    ? { marginBottom: '15px' }
                    : ''
                "
              >
                <template v-if="item.status === 'finished'">
                  <img :src="item.response.data.fileUrl" />
                  <div class="demo-upload-list-cover">
                    <Icon
                      type="ios-eye-outline"
                      @click="handleView(item.response.data.fileUrl)"
                    ></Icon>
                  </div>
                  <Icon
                    type="ios-close-circle"
                    style="color: #a4a3a3"
                    size="15"
                    @click="environmenthandleRemove(item)"
                  ></Icon>
                </template>
                <template v-else>
                  <Progress
                    v-if="item.showProgress"
                    :percent="item.percentage"
                    hide-info
                  ></Progress>
                </template>
              </div>
            </div>
            <p class="tips">
              支持<span class="red">JPG、JPEG、PNG</span>格式大小不超过<span
                class="red"
                >5M</span
              >
            </p>
          </FormItem>

          <!-- 公司介绍 -->
          <FormItem class="companyDesc" label="公司介绍" prop="desc">
            <Input
              v-model="formData.desc"
              type="textarea"
              placeholder="请输入公司介绍"
              :maxlength="300"
            ></Input>
            <p class="remainLength">
              <span>{{ formData.desc.length }}</span>
              <span>/</span>
              <span>300</span>
            </p>
          </FormItem>
          <FormItem class="submit">
            <Button type="primary" @click="setup = true">下一步1/2</Button>
          </FormItem>
        </div>

        <div class="setup2" v-show="setup">
          <!-- 联系人 -->
          <FormItem
            class="companyName notRequired"
            label="联系人"
            prop="contacts"
          >
            <Input
              v-model="formData.contacts"
              placeholder="请输入联系人"
            ></Input>
          </FormItem>
          <!-- 职位 -->
          <FormItem class="companyName" label="职位" prop="job">
            <Input v-model="formData.job" placeholder="请输入您的职位"></Input>
          </FormItem>
          <!-- 手机号 -->
          <FormItem class="companyName notRequired" label="手机号" prop="call">
            <Input
              v-model="formData.call"
              placeholder="请输入您的手机号"
            ></Input>
          </FormItem>

          <!-- 邮箱 -->
          <FormItem class="companyName" label="邮箱" prop="email">
            <Input
              type="email"
              v-model="formData.email"
              placeholder="请输入您的邮箱"
            ></Input>
          </FormItem>
          <!-- 提交按钮 -->
          <FormItem class="submit">
            <Button type="primary" class="prv" @click="setup = false"
              >上一步</Button
            >
            <Button type="primary" @click="handleSubmit">确认提交</Button>
          </FormItem>
        </div>
      </Form>
    </Modal>
  </div>
</template>

<script>

export default {
  props: {
    // modal: {
    //   Object: Boolean,
    // }
  },
  data() {
    const validateCompanyName = async (rule, value, callback) => {
      var reg = new RegExp('^[\u4E00-\u9FFF]+$')
      if (value === '') {
        callback(new Error('请输入公司名称'));
      } else if (value.length > 30 || value.length < 2) {
        callback(new Error('公司名称不少于2个字符，不多于30个字符'));
      }
      else if (!reg.test(value)) {
        callback(new Error('公司名称只能为汉字'));
      }
      else {
        const res = await checkCompanyName({ companyName: value, dataType: 1 })
        if (!res.data.isSuccess) {
          callback(new Error('您输入的公司名称已被占用，请联系客服400-006-6655转2 ；'));
        }
        else {
          callback();
        }
      }
    }

    //公司所在地验证规则
    const validateCompanyAddress = (rule, value, callback) => {
      if (!this.formData.companyAddress.length) {
        callback(new Error('请选择公司所在地'));
      } else {
        callback();
      }
    }

    // 发布时间验证规则
    const validatepublicTime = (rule, value, callback) => {
      console.log(this.formData.publicTime);
      if (!value) {
        callback(new Error('请选择成立时间'));
      } else {
        callback();
      }
    }
    // 公司规模验证规则
    const validateCompanyScale = (rule, value, callback) => {
      if (!this.formData.companyScale.value) {
        callback(new Error('请选择公司规模'));
      } else {
        callback();
      }
    }
    // 经营模式验证规则
    const validateBusinessModel = (rule, value, callback) => {
      if (!this.formData.businessModel.value) {
        callback(new Error('请选择经营模式'));
      } else {
        callback();
      }
    }
    // 所属行业验证规则
    const validateIndustry = (rule, value, callback) => {
      if (this.formData.Industry.length == 0) {
        callback(new Error('请选择所属行业'));
      } else {
        callback();
      }
    }
    // 免责声明验证规则
    const validateAgree = (rule, value, callback) => {
      if (!this.formData.agree) {
        callback(new Error('请勾选免责声明'));
      } else {
        callback();
      }
    }

    // 营业制造验证规则
    const validateBusinessLicense = (rule, value, callback) => {
      console.log(this.businessLicenseUploadList, '营业执照验证规则');
      if (this.businessLicenseUploadList.length == 0) {
        callback(new Error('请上传营业执照'));
      } else {
        callback();
      }
    }
    // 主营业务验证规则
    const validateMainBusiness = (rule, value, callback) => {
      if (!this.formData.mainBusiness.length) {
        callback(new Error('请添加主营业务'));
      } else {
        callback();
      }
    }
    // 注册资金验证规则
    const validateRegisteredFund = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入注册资金'));
      } else {
        callback();
      }
    }
    // 公司法人验证规则
    const validatelegalPerson = (rule, value, callback) => {
      let reg = /[\u4e00-\u9fa5a-zA-Z]/
      if (!value) {
        callback();
      }
      else if (!reg.test(value)) {
        callback(new Error('公司法人只能为中英文字符，不包含特殊字符'));
      } else if (value.length > 15 || value.length < 2) {
        callback(new Error('公司法人不少于2个字符，不多于15个字符'));
      } else {
        callback();
      }
    }
    // 职位规则验证
    const validateJob = (rule, value, callback) => {
      let reg = /[\u4e00-\u9fa5a-zA-Z]/
      if (!value) {
        callback(new Error('请输入职位'));

      } else if (!reg.test(value)) {
        callback(new Error('职位只能为中英文字符，不包含特殊字符'));
      } else if (value.length > 15 || value.length < 2) {
        callback(new Error('职位不少于2个字符，不多于15个字符'));
      }
      else {
        callback();
      }
    }

    // 邮箱验证规则
    const validateEmail = (rule, value, callback) => {
      let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!value) {
        callback(new Error('请输入您的邮箱'));

      } else if (!reg.test(value)) {
        callback(new Error('邮箱格式有误'));
      } else {
        callback();

      }
    }


    return {
      modal: false,

      //成立时间禁用超过当前日期的时间规则
      publicTimeOption: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },

      formData: {
        logo: '',               //logo
        companyName: '',        //公司名称
        companyAddress: [],     //公司所在地
        Industry: [],   //所属行业
        registeredAddress: '',  //注册地址
        registeredFund: '',      //注册资金
        publicTime: '',         //成立时间
        companyScale: {         //公司规模
          value: 0,
          label: ''
        },
        businessModel: {     //经营模式
          value: 0,
          label: ''
        },
        legalPerson: '',          //公司法人
        businessLicense: '',    //营业执照
        otherCertificates: '',   //其他证书
        corporateEnvironment: '', //公司环境
        desc: '',      //公司介绍
        mainBusiness: [], //主营业务
        contacts: '',  //联系人
        job: '',       //职位
        call: '',      //手机号
        callcode: '',  //验证码
        email: '',     //邮箱
        agree: false,   //勾选协议
      },

      setup: false,   //下一步

      uploadUrl: '3333', //上传图片的地址

      // 省份
      //地区数据
      areaData: [],

      inputVal: '',   //主营业务输入文字缓存
      // 公司规模数据
      companyScale: [
        {
          value: 101,
          label: '0-20人'
        },
        {
          value: 102,
          label: '20-99人'
        },
        {
          value: 103,
          label: '100-499人'
        },
        {
          value: 104,
          label: '500-999人'
        },
        {
          value: 105,
          label: '1000-9999人'
        },
        {
          value: 106,
          label: '10000人以上'
        },
      ],

      // 所属行业级联选择数据
      IndustryData: [],

      // 营业执照
      businessLicenseUploadList: [

      ],


      // 其他证书
      otherCertificatesList: [

      ],
      // 公司环境
      corporateEnvironmentList: [

      ],
      isShow: false,
      // 主营业务
      mainBusinessList: [
        {
          name: '如面包机', edit: true, mouse: false
        },
        {
          name: '如包子机', edit: true, mouse: false
        },
        {
          name: '如月饼机', edit: true, mouse: false
        },
      ],

      defaultMainBusinessList: [
        {
          name: '如面包机', edit: true, mouse: false
        },
        {
          name: '如包子机', edit: true, mouse: false
        },
        {
          name: '如月饼机', edit: true, mouse: false
        },
      ],

      ruleValidate: {
        companyName: [
          { required: true, validator: validateCompanyName, trigger: 'blur' }
        ],
        companyAddress: [
          { required: true, validator: validateCompanyAddress, trigger: 'change' }
        ],
        Industry: [
          { required: true, validator: validateIndustry, trigger: 'change' }
        ],
        detailedAddress: [
          { required: true, message: '请输入注册地址', trigger: 'blur' }
        ],
        registeredFund: [
          { required: true, validator: validateRegisteredFund, trigger: 'blur' }
        ],
        publicTime: [
          { required: true, validator: validatepublicTime, trigger: 'blur' }
        ],
        companyScale: [
          { required: true, validator: validateCompanyScale, trigger: 'change' }
        ],
        businessModel: [
          { required: true, validator: validateBusinessModel, trigger: 'change' }
        ],
        businessLicense: [
          { required: true, validator: validateBusinessLicense, trigger: 'blur' }
        ],
        legalPerson: [
          { validator: validatelegalPerson, trigger: 'blur' }
        ],
        mainBusiness: [
          { required: true, validator: validateMainBusiness, trigger: 'blur' }
        ],

        desc: [
          { required: true, message: '请输入公司简介', trigger: 'blur' }
        ],
        job: [
          { required: true, validator: validateJob, trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
      }

    }
  },

  methods: {
    // 选择成立时间
    changePublicDate(val) {
      this.formData.publicTime = val
    },

    handleView(name) {
      this.viewImgUrl = name
      this.visible = true
    },

    // 营业执照上传成功钩子
    businessLicensehandleSuccess(res, file, filelist) {
      if (res.isSuccess) {
        this.businessLicenseUploadList = [file];
      } else {
        Message.warning(res.msg);
      }
    },
    // 其他资质证书上传成功钩子
    otherCertificateshandleSuccess(res, file, filelist) {
      if (res.isSuccess) {
        if (this.otherCertificatesList.length > 9) {
          Message.warning('其他资质证书最多上传10张图片')
        } else {
          this.otherCertificatesList.push(file)
        }
      } else {
        Message.warning(res.msg);
      }
    },
    // 公司环境上传成功钩子
    environmenthandleSuccess(res, file, filelist) {
      if (res.isSuccess) {
        if (this.corporateEnvironmentList.length > 9) {
          Message.warning('公司环境最多上传10张图片')
        } else {
          this.corporateEnvironmentList.push(file)
        }
      } else {
        Message.error(res.msg);
      }
    },

    // 删除营业执照
    businessLicensehandleRemove(file) {
      // 从 upload 实例删除数据
      const fileList = this.$refs.businessLicenseUpload.fileList;
      this.$refs.businessLicenseUpload.fileList.splice(fileList.indexOf(file), 1);
      this.businessLicenseUploadList = []
      this.removeImage(file.response.data.fid)
    },

    // 删除其他证书
    otherCertificateshandleRemove(file) {
      // 从 upload 实例删除数据
      const fileList = this.$refs.otherCertificatesUpload.fileList;
      this.$refs.otherCertificatesUpload.fileList.splice(fileList.indexOf(file), 1);
      this.otherCertificatesList.splice(fileList.indexOf(file), 1)
      this.removeImage(file.response.data.fid)
    },
    // 删除公司环境
    environmenthandleRemove(file) {
      // 从 upload 实例删除数据
      const fileList = this.$refs.environmentUpload.fileList;
      this.$refs.environmentUpload.fileList.splice(fileList.indexOf(file), 1);
      this.corporateEnvironmentList.splice(fileList.indexOf(file), 1);
      this.removeImage(file.response.data.fid)
    },

    handleBeforeUpload(file) {
      // if (this.businessLicenseUploadList.length >= 2) {
      //   console.log('只能上传1张图片');
      //   this.$Notice.warning({
      //     title: "只能上传1张图片",
      //   });
      //   return false
      // }
      // return true;
    },

    handleFormatError(file) {
      Message.warning('不支持的文件格式');
    },
    // 上传文件大小判断
    handleMaxSize(file) {
      Message.warning('上传文件大小不能大于5M');
    },

    // 添加主营业务
    addMainBusiness() {
      if (this.mainBusinessList.length <= 14) {
        this.mainBusinessList.push({ name: '', edit: false, mouse: false })
        this.$nextTick(() => {
          this.$refs.input[0].focus()
        })
      }

    },

    // 编辑当前主营业务
    editCurrent(index, name) {
      this.inputVal = name
      this.mainBusinessList[index].edit = false
      this.mainBusinessList[index].name = ''


      this.$nextTick(() => {
        this.$refs.input[0].focus()
      })

    },

    deleteMainBusiness(index, name) {
      // if (this.formData.mainBusiness.indexOf(name) != -1) {
      //   this.formData.mainBusiness.splice(this.mainBusiness.findIndex(name), 1)
      // }
      this.formData.mainBusiness.splice(index, 1)
      this.mainBusinessList.splice(index, 1)

    },

    // 编辑完成
    editFinished(index) {
      this.mainBusinessList[index].edit = true
      // if (this.mainBusinessList[index].name) {
      //   this.mainBusinessList[index].edit = true
      //   this.isShow = false
      // }
      // else {
      //   this.mainBusinessList.splice(index, 1)
      //   this.isShow = false
      // }
      if (this.mainBusinessList[index].name) {
        if (this.inputVal !== this.mainBusinessList[index].name) {
          this.formData.mainBusiness[index] = this.mainBusinessList[index]
        }
      } else {
        if (index > 2) {
          this.mainBusinessList.splice(index, 1)
        } else {
          this.mainBusinessList[index].name = this.inputVal
        }

      }

    },

    // 过滤公司规模
    filterCompanyScale(val) {
      switch (val) {
        case 101:
          return { value: val, label: '0-20人' };
          break;

        case 102:
          return { value: val, label: '20-99人' };
          break;

        case 103:
          return { value: val, label: '100-499人' };
          break;

        case 104:
          return { value: val, label: '500-999人' };
          break;

        case 105:
          return { value: val, label: '1000-9999人' };
          break;

        case 106:
          return { value: val, label: '10000人以上' };
          break;

      }
    },
    // 过滤经营模式
    filterBusinessModel(val) {
      switch (val) {
        case 201:
          return { value: val, label: '生产型' };
          break;

        case 202:
          return { value: val, label: '贸易型' };
          break;

        case 203:
          return { value: val, label: '服务型' };
          break;

        case 204:
          return { value: val, label: '经销批发' };
          break;

        case 205:
          return { value: val, label: '招商代理' };
          break;

        case 206:
          return { value: val, label: '政府机构' };
          break;
        case 207:
          return { value: val, label: '其他' };
          break;

      }
    },

    // 删除图片
    removeImage(fid) {
      removeImage({ fid })
    },




    //提交方法
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {

        }
      })
    },

  },

  mounted() {

  }
}
</script>

<style lang="less" scoped>
.bidFormeModal {
  .regOnline {
    position: relative;

    .tips {
      position: absolute;
      top: 26px;
      left: 113px;
      color: #999999;
      font-size: 14px;
    }
    /deep/ .ivu-modal-header {
      border: none !important;
      padding: 26px 24px;
      padding-bottom: 20px;
    }

    /deep/ .ivu-modal-header-inner {
      font-size: 20px !important;
      font-weight: 400 !important;
      padding-bottom: 13px;
      height: 35px !important;
      border-bottom: 1px solid #dcdee2;
    }
    /deep/ .ivu-modal-body {
      padding: 20px 40px;
    }

    .ivu-form {
      .notRequired.ivu-form-item {
        /deep/ .ivu-form-item-label {
          padding-left: 10px;
        }
      }
      .ivu-form-item {
        margin-bottom: 23px !important;
        /deep/ .ivu-form-item-label {
          text-align: left;
          font-size: 14px;
          width: 104px !important;
          color: #333;
        }
        /deep/ .ivu-form-item-content {
          margin-left: 104px !important;
        }
        /deep/ .ivu-input {
          width: 420px !important;
          height: 40px !important;
          padding-left: 12px !important;
        }
        /deep/ .ivu-input::-webkit-input-placeholder {
          color: #999;
        }
        /deep/ .ivu-select-item {
          color: #333 !important;
        }
        /deep/ .ivu-form-item-error-tip {
          padding-bottom: 2px;
        }
      }
      .notRequired.ivu-form-item {
        /deep/ .ivu-form-item-label {
          padding-left: 10px;
        }
      }

      // logo
      .logo.ivu-form-item {
        display: flex;
        align-items: center;
        /deep/ .ivu-form-item-content {
          display: flex;
        }
        /deep/ .ivu-icon {
          line-height: 47px !important;
          padding-right: 2px;
        }
        .demo-upload-list {
          display: inline-block;
          width: 48px;
          height: 48px;
          text-align: center;
          line-height: 60px;
          border: 1px solid transparent;
          border-radius: 50%;
          overflow: hidden;
          background: #fff;
          position: relative;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
          margin-right: 4px;
          /deep/ .ivu-icon {
            line-height: 48px !important;
            vertical-align: 0px !important;
          }
        }
        .demo-upload-list img {
          width: 48px;
          height: 48px;
        }
        .demo-upload-list-cover {
          display: none;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.6);
        }
        .demo-upload-list:hover .demo-upload-list-cover {
          display: block;
        }
        .demo-upload-list-cover i {
          color: #fff;
          font-size: 20px;
          cursor: pointer;
          margin: 0 2px;
        }
        /deep/ .ivu-upload {
          width: 48px !important;
          border-radius: 50%;
          margin-left: 12px;
          div {
            width: 48px !important;
            height: 48px !important;
            line-height: 48px !important;
            background-color: #f0f0f0;
          }
        }
        /deep/ .ivu-form-item-content {
          line-height: 9px;
          margin-left: 21px !important;
        }
      }

      // 公司所在地
      .companyAddress.ivu-form-item {
        /deep/ .ivu-input {
          height: 40px !important;
          font-size: 14px !important;
          color: #999 !important;
        }

        /deep/ .ivu-cascader-menu-item {
          width: 168px;
          height: 32px;
          font-size: 14px !important;
          color: #333;
          padding-left: 12px !important;
        }
        /deep/ .ivu-cascader-menu::-webkit-scrollbar {
          /*滚动条整体样式*/
          width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
          height: 10px !important;
        }
        /deep/ .ivu-cascader-menu::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          height: 20px !important;
          border-radius: 10px;
          background-color: #dce1e5;
        }
        /deep/ .ivu-cascader-menu {
          height: 192px !important;
        }
        /deep/ .ivu-input {
          font-size: 14px !important;
        }
      }

      // 公司名称
      .companyName.ivu-form-item {
        /deep/ .ivu-input {
          width: 420px !important;
          height: 40px !important;
          line-height: 40px !important;
          border-radius: 2px !important;
          font-size: 14px;
          color: #999;
        }
        /deep/ .ivu-icon {
          width: 40px !important;
          height: 40px !important;
          line-height: 40px !important;
        }
      }
      // 注册地址
      .registeredAddress.ivu-form-item {
        /deep/ .ivu-input {
          width: 420px !important;
          height: 40px !important;
          line-height: 40px !important;
          border-radius: 2px !important;
          font-size: 14px;
          color: #999;
        }
      }
      .legalPerson.ivu-form-item {
        /deep/ .ivu-form-item-label {
          padding-left: 10px;
        }
        /deep/ .ivu-icon {
          width: 40px !important;
          height: 40px !important;
          line-height: 40px !important;
        }
      }

      //注册资本
      .registeredFund.ivu-form-item {
        /deep/ .ivu-input {
          width: 420px !important;
          height: 40px !important;
          line-height: 7px !important;
          border-radius: 2px !important;
          font-size: 14px;
          color: #999;
        }
        /deep/ input::-webkit-outer-spin-button {
          -webkit-appearance: none !important;
          appearance: none;
          margin: 0;
        }
        /deep/ input::-webkit-inner-spin-button {
          -webkit-appearance: none !important;
          appearance: none;
          margin: 0;
        }
        /deep/ .ivu-form-item-content {
          display: flex;
          align-items: center;
        }

        .unit {
          width: 50px;
          color: #999;
          font-size: 14px;
          margin-left: 3px;
        }
      }

      // 成立时间
      .publicTime.ivu-form-item {
        /deep/ .ivu-input {
          width: 420px !important;
          height: 40px !important;
          line-height: 40px !important;
          border-radius: 2px !important;
          font-size: 14px;
          color: #999;
        }

        /deep/ .ivu-input-suffix {
          right: -67px;
          line-height: 40px;
        }
        /deep/ .ivu-icon {
          line-height: 11px !important;
        }
      }
      //   所属行业
      .Industry.ivu-form-item {
        /deep/ .ivu-input {
          color: #999;
        }
        /deep/ .ivu-cascader-menu-item {
          width: 168px;
          height: 32px;
          font-size: 14px !important;
          color: #999;
          padding-left: 12px !important;
        }
        /deep/ .ivu-cascader-menu::-webkit-scrollbar {
          /*滚动条整体样式*/
          width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
          height: 9px !important;
        }
        /deep/ .ivu-cascader-menu::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          height: 20px !important;
          border-radius: 10px;
          background-color: #dce1e5;
        }
        /deep/ .ivu-cascader-menu {
          height: 192px !important;
        }
        /deep/ .ivu-input {
          font-size: 14px !important;
        }
      }

      // 公司规模
      .companyScale.ivu-form-item {
        /deep/ .ivu-select {
          width: 420px !important;
          margin-right: 8px;
        }

        /deep/ .ivu-select-selection {
          height: 40px !important;
          border-radius: 2px !important;
        }

        /deep/ .ivu-select-placeholder {
          height: 40px !important;
          line-height: 40px !important;
          font-size: 14px !important;
          color: #999;
        }

        /deep/ .ivu-select-item {
          font-size: 14px !important;
          color: #999;
        }
        /deep/ .ivu-select-selected-value {
          height: 40px !important;
          line-height: 40px !important;
          font-size: 14px;
          color: #999;
        }
        /deep/ .ivu-select-dropdown {
          max-height: none;
        }
      }

      // 营业执照
      .businessLicense.ivu-form-item {
        .uploadList {
          display: flex;
          flex-wrap: wrap;
        }
        .demo-upload-list {
          display: inline-block;
          width: 80px;
          height: 80px;
          text-align: center;
          line-height: 60px;
          border: 1px solid #d2d2d2;
          border-radius: 4px;
          overflow: hidden;
          background: #fff;
          position: relative;
          margin-right: 55px;
          margin-right: 15px;
          padding-top: 28px;
          .ivu-icon {
            position: absolute;
            top: 3px;
            right: 2px;
            cursor: pointer;
          }
          /deep/ .ivu-icon.ivu-icon-ios-eye-outline {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          /deep/ .ivu-progress-inner {
            vertical-align: -40px !important;
          }
        }
        .demo-upload-list img {
          width: 80px;
        }
        .demo-upload-list-cover {
          display: none;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.6);
        }
        .demo-upload-list:hover .demo-upload-list-cover {
          display: block;
        }
        .demo-upload-list-cover i {
          color: #fff;
          font-size: 20px;
          cursor: pointer;
          margin: 0 2px;
        }
        /deep/ .ivu-upload {
          width: 80px !important;
          border-radius: 4px;
          margin-right: 15px;
          div {
            width: 80px !important;
            height: 80px !important;
            // line-height: 148px !important;
            background-color: #f0f0f0;
            div {
              display: flex;
              flex-direction: column;
              justify-content: center;
              span {
                line-height: 20px;
                color: #c3c3c3;
              }
            }
          }
        }
        /deep/ .ivu-form-item-content {
          line-height: 9px;
          margin-left: 0px !important;
          flex: 1;
        }

        /deep/ .ivu-form-item-label {
          line-height: 1.4 !important;
        }

        .tips {
          position: absolute;
          top: 89px;
          left: 104px;
          color: #999999;
          font-size: 12px;
        }
      }

      //其他证书
      .otherCertificates.ivu-form-item {
        /deep/ .ivu-form-item-label {
          padding-left: 10px !important;
        }
      }

      // 公司介绍
      .companyDesc.ivu-form-item {
        position: relative;
        /deep/ .ivu-input {
          width: 896px !important;
          height: 203px !important;
        }
        .remainLength {
          position: absolute;
          bottom: 12px;
          right: 12px;
          color: #999;
          line-height: 7px;
        }
      }

      //   主营业务
      .mainBusiness.ivu-form-item {
        /deep/ .ivu-form-item-content {
          align-items: center;
          position: relative;
          width: 900px !important;
          z-index: 0;
        }
        /deep/ .ivu-input-wrapper {
          position: absolute !important;
          left: 0px;
          top: 3px;
          text-align: right !important;
          width: 130px;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          width: 420px;
          position: relative;
          list-style: none;
          li {
            position: relative;
            width: 159px;
            height: 40px;
            line-height: 40px;
            border-radius: 2px;
            padding-left: 9px;
            opacity: 1;
            border: 1px solid #dcdee2;
            background-color: #fff;
            margin-right: 8px;
            font-size: 14px;
            z-index: 1;
            color: #999;
            .ivu-icon {
              position: absolute;
              top: 4px;
              right: 3px;
              font-size: 12px;
              cursor: pointer;
            }
          }
          /deep/ .ivu-input {
            width: 130px !important;
            height: 35px !important;
            font-size: 14px;
            border: none;
            outline: none;
            color: #666;
            padding-left: 9px !important;
          }
          /deep/ .ivu-input:focus {
            border: none;
            box-shadow: none;
          }
        }
        .add {
          position: relative;
          // right: -146px;
          width: 40px;
          height: 40px;
          line-height: 41px;
          text-align: center;
          border-radius: 2px 2px 2px 2px;
          border: 1px solid #dcdee2;
          padding-left: 0px;
          cursor: pointer;
        }
      }
      // 验证码
      .callCode.ivu-form-item {
        /deep/ .ivu-input {
          width: 276px !important;
          height: 40px !important;
          line-height: 40px !important;
          border-radius: 2px !important;
          font-size: 14px;
        }
        /deep/ .ivu-form-item-content {
          display: flex;
        }

        button {
          width: 114px;
          height: 40px;
          line-height: 40px;
          border-radius: 2px 2px 2px 2px;
          background-color: #fff;
          border: 1px solid #dcdee2;
          color: #5489ff;
          font-size: 14px;
          cursor: pointer;
        }

        /deep/ .ivu-input-wrapper {
          width: 276px;
          margin-right: 10px;
        }

        /deep/ .ivu-form-item-content {
          margin-left: 113px !important;
        }
      }

      // 提示
      .caution.ivu-form-item {
        p {
          margin-left: 92px !important;
          font-size: 12px;
          color: #999;
          line-height: 12px;
          .highlight {
            color: #5489ff;
          }
        }
      }
      .agree.ivu-form-item {
        /deep/ .ivu-form-item-content {
          margin-left: 140px !important;
        }
        /deep/ .ivu-form-item-error-tip {
          width: 300px !important;
        }
        span {
          cursor: pointer;
        }
      }

      .submit.ivu-form-item {
        width: 100%;
        display: block;
        text-align: center;
        /deep/ .ivu-btn {
          width: 127px;
          height: 48px;
          line-height: 38px;
          background: #5489ff;
          border-radius: 2px;
          font-size: 16px;
          letter-spacing: 0.5px;
        }

        /deep/ .ivu-form-item-content {
          margin-left: 0 !important;
        }

        /deep/ .ivu-btn.prv {
          margin-right: 15px;
        }
      }
    }
  }
}
</style>