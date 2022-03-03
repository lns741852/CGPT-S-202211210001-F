<template>
  <div>
    <h3>盤包列表</h3>
    <!--卡片區塊-->
    <el-card class="box-card">
      <el-row :gutter="100">
        <el-col :span="8">
          <!--輸入框-->
          <el-input
            placeholder="盤包代號"
            v-model="queryInfo.searchName"
            clearable
            @clear="getsetnoList"
            @keyup.enter="getsetnoList"
          >
            <template #append>
              <el-button @click="getsetnoList">search...</el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="12"> </el-col>
        <el-button type="primary" @click="addDialogVisible = true"
          >新增盤包</el-button
        >
      </el-row>
      <!--列表-->
      <el-table :data="setnoList" style="width: 100%">
        <el-table-column type="index" label="編號" width="60" />
        <el-table-column prop="setno" label="盤包代號" width="100" />
        <el-table-column prop="setname" label="英文名稱" width="200" />
        <el-table-column prop="setnamech" label="中文名稱" width="200" />
        <el-table-column prop="positionId" label="儲位" />
        <el-table-column prop="numbaseCsr" label="CSR庫存量" />
        <el-table-column prop="numbaseCsr2" label="CSR2庫存量" />
        <el-table-column prop="numbaseOr1" label="AOR庫存量" />
        <el-table-column prop="numbaseOr2" label="BOR庫存量" />
        <el-table-column prop="numbaseOr3" label="GOR庫存量" />
        <el-table-column prop="numbaseWr1" label="WR庫存量" />
        <el-table-column prop="price" label="成本" />
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button type="primary" @click="showEditDialon(scope.row.id)"
              >修改</el-button
            >
            <el-button
              type="primary"
              @click="deleteAccount(scope.row.id, scope.row.usercname)"
              >刪除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--分頁-->
      <el-pagination
        :current-page="queryInfo.pageno"
        :page-size="queryInfo.pagesize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
    <!--新增用戶對話框-->
    <el-dialog
      v-model="addDialogVisible"
      @close="addDialogClosed"
      width="50%"
      title="添加盤包"
    >
      <!--表單驗證-->
      <template #default>
        <el-form
          ref="addFormRef"
          :model="addForm"
          label-width="120px"
          :rules="addFormRules"
        >
          <el-form-item label="盤包代號" prop="setno">
            <el-input v-model="addForm.setno"></el-input>
          </el-form-item>
          <el-form-item label="中文名稱" prop="setnamech">
            <el-input v-model="addForm.setnamech"></el-input>
          </el-form-item>
          <el-form-item label="英文名稱" prop="setname">
            <el-input v-model="addForm.setname"></el-input>
          </el-form-item>
          <!--新增_下拉選單-->
          <el-form-item label="標籤製作預設值" prop="x">
            <el-form-item label="消毒方式" prop="x">
              <el-select
                v-model="addForm.spotno"
                placeholder="請選擇"
                @change="getProcess"
                clearable
              >
                <el-option
                  v-for="item in potdataList"
                  :key="item.DISINFECTION"
                  :label="item.POTNAME"
                  :value="item.DISINFECTION"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="包裝方式" prop="x">
              <el-select
                v-model="addForm.sprocess"
                placeholder="請選擇"
                clearable
              >
                <el-option
                  v-for="item in processList"
                  :key="item.PROCESSNO"
                  :label="item.PROCESSNAME"
                  :value="item.PROCESSNO"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保存天數" prop="x">
              <el-select v-model="addForm.sday" placeholder="請選擇" clearable>
                <el-option
                  v-for="item in dateList"
                  :key="item"
                  :label="processDate[item]"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item label="成本">
            <el-input v-model="addForm.price"></el-input>
          </el-form-item>
          <el-form-item label="CSR基本量">
            <el-input v-model="addForm.numbaseCsr"></el-input>
          </el-form-item>
          <el-form-item label="CSR2基本量">
            <el-input v-model="addForm.numbaseCsr2"></el-input>
          </el-form-item>
          <el-form-item label="AOR基本量">
            <el-input v-model="addForm.numbaseOr1"></el-input>
          </el-form-item>
          <el-form-item label="BOR基本量">
            <el-input v-model="addForm.numbaseOr2"></el-input>
          </el-form-item>
          <el-form-item label="GOR基本量">
            <el-input v-model="addForm.numbaseOr3"></el-input>
          </el-form-item>
          <el-form-item label="WR基本量">
            <el-input v-model="addForm.numbaseWr1"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addSetno">確定</el-button>
          <el-button @click="addDialogVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <!--修改_對話框-->
    <el-dialog
      v-model="addDialogVisible"
      @close="addDialogClosed"
      width="50%"
      title="修改盤包"
    >
      <!--表單驗證-->
      <template #default>
        <el-form
          ref="addFormRef"
          :model="addForm"
          label-width="120px"
          :rules="addFormRules"
        >
          <el-form-item label="盤包代號" prop="setno">
            <el-input v-model="addForm.setno"></el-input>
          </el-form-item>
          <el-form-item label="中文名稱" prop="setnamech">
            <el-input v-model="addForm.setnamech"></el-input>
          </el-form-item>
          <el-form-item label="英文名稱" prop="setname">
            <el-input v-model="addForm.setname"></el-input>
          </el-form-item>
          <!--新增_下拉選單-->
          <el-form-item label="標籤製作預設值" prop="x">
            <el-form-item label="消毒方式" prop="x">
              <el-select
                v-model="addForm.spotno"
                placeholder="請選擇"
                @change="getProcess"
                clearable
              >
                <el-option
                  v-for="item in potdataList"
                  :key="item.DISINFECTION"
                  :label="item.POTNAME"
                  :value="item.DISINFECTION"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="包裝方式" prop="x">
              <el-select
                v-model="addForm.sprocess"
                placeholder="請選擇"
                clearable
              >
                <el-option
                  v-for="item in processList"
                  :key="item.PROCESSNO"
                  :label="item.PROCESSNAME"
                  :value="item.PROCESSNO"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保存天數" prop="x">
              <el-select v-model="addForm.sday" placeholder="請選擇" clearable>
                <el-option
                  v-for="item in dateList"
                  :key="item"
                  :label="processDate[item]"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item label="成本">
            <el-input v-model="addForm.price"></el-input>
          </el-form-item>
          <el-form-item label="CSR基本量">
            <el-input v-model="addForm.numbaseCsr"></el-input>
          </el-form-item>
          <el-form-item label="CSR2基本量">
            <el-input v-model="addForm.numbaseCsr2"></el-input>
          </el-form-item>
          <el-form-item label="AOR基本量">
            <el-input v-model="addForm.numbaseOr1"></el-input>
          </el-form-item>
          <el-form-item label="BOR基本量">
            <el-input v-model="addForm.numbaseOr2"></el-input>
          </el-form-item>
          <el-form-item label="GOR基本量">
            <el-input v-model="addForm.numbaseOr3"></el-input>
          </el-form-item>
          <el-form-item label="WR基本量">
            <el-input v-model="addForm.numbaseWr1"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editSetno">確定</el-button>
          <el-button @click="addDialogVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      potdataList: [],
      processList: [],
      dateList: [1, 7, 14, 30, 60, 90, 180, 365],
      processDate: {
        1: "一天",
        7: "一周",
        14: "兩周",
        30: "一個月",
        60: "兩個月",
        90: "三個月",
        180: "半年",
        365: "一年",
      },
      queryInfo: {
        searchName: "",
        pageno: "",
        pagesize: "",
      },
      setnoList: [],
      total: "",
      addDialogVisible: false,
      addForm: {},
      addFormRules: {
        setno: [
          { required: true, message: "請輸入...", trigger: "blur" },
          { min: 3, max: 10, message: "長度3~10", trigger: "blur" },
        ],
        spotno: [{ required: true, message: "請輸入...", trigger: "blur" }],
        usercname: [
          { required: true, message: "請輸入...", trigger: "blur" },
          { min: 3, max: 10, message: "長度3~10", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getPotdata();
    this.getsetnoList();
    this.getAuth();
  },
  methods: {
    /** 消毒鍋查詢 */
    getPotdata() {
      this.$axios.get("/setno/potdata").then((res) => {
        this.potdataList = res.data.data;
      });
    },
    /** 消毒包裝查詢 */
    getProcess() {
      this.$axios.get("/setno/potdata/" + this.addForm.spotno).then((res) => {
        this.processList = res.data.data;
      });
    },
    /**列表查詢 */
    getsetnoList() {
      this.$axios.get("/setno", this.queryInfo).then((res) => {
        this.total = res.data.data.total;
        this.setnoList = res.data.data.list;
      });
    },
    /**權限查詢 */
    getAuth() {
      this.$axios.get("/auth").then((res) => {
        this.auth = res.data.data;
      });
    },
    /**監聽頁面刷新 */
    handleCurrentChange(newPage) {
      this.queryInfo.pageno = newPage;
      this.getsetnoList();
    },
    /**清空訊息 */
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
      this.ids = [];
    },
    /**清空訊息 */
    editDialogClosed() {
      this.$refs.addFormRef.resetFields();
      this.ids = [];
    },
    /**新增盤包 */
    addSetno() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        //陣列轉字串
        // for (let i = 0; i < this.ids.length; i++) {
        //   this.addForm.ids = this.addForm.ids + "," + this.ids[i];
        // }
        // this.addForm.ids = this.addForm.ids.substring(1);
        this.$axios.post("/setno", this.addForm).then(() => {
          this.addDialogVisible = false;
          this.getsetnoList();
        });
      });
    },
    /**編輯帳號 */
    editSetno() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        this.$axios
          .put("/account/" + this.editForm.id, this.editForm)
          .then(() => {
            this.addDialogVisible = false;
            this.getsetnoList();
          });
      });
    },
    /**顯示修改帳戶 */
    showEditDialon(id) {
      this.$axios.get("/setno/" + id).then((res) => {
        this.addForm = res.data.data;
      });
      this.addDialogVisible = true;
    },
    /**刪除 */
    deleteAccount(id, name) {
      this.$msgbox
        .confirm("確定要刪除 " + name + " ?", "刪除", {
          cancelButtonText: "取消",
          confirmButtonText: "確定",
          type: "warning",
        })
        .then(() => {
          this.$axios.remove("/account/" + id).then(() => {
            this.getsetnoList();
          });
        })
        .catch(() => {
          //nothing to do
        });
    },
  },
};
</script>

<style lang="less" scope>
</style>