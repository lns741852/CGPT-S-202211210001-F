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
            @clear="getcasecarList"
            @keyup.enter="getcasecarList"
          >
            <template #append>
              <el-button @click="getcasecarList">search...</el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="12">        
        </el-col>
        <el-button type="primary" @click="addDialogVisible = true"
          >新增盤包</el-button
        >
      </el-row>
      <!--列表-->
      <el-table :data="casecarList" style="width: 100%">
        <el-table-column type="index" label="編號" width="80" />
        <el-table-column prop="userno" label="員工代號" width="180" />
        <el-table-column prop="usercname" label="員工姓名" width="180" />
        <el-table-column prop="depno" label="部門" />
        <el-table-column label="權限">
          <template #default="scope">
            {{ privilegens[scope.row.systemprivilege] }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="showEditDialon(scope.row.id)"
              >修改</el-button
            >
            <el-button type="primary" @click="deleteAccount(scope.row.id,scope.row.usercname)"
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
      title="添加用戶"
    >
      <!--驗證-->
      <template #default>
        <el-form
          ref="addFormRef"
          :model="addForm"
          label-width="80px"
          :rules="addFormRules"
        >
          <el-form-item label="員工編號" prop="userno">
            <el-input v-model="addForm.userno"></el-input>
          </el-form-item>
          <!--新增_下拉選單-->
          <el-form-item label="部門" prop="depno">
            <el-select v-model="addForm.depno" placeholder="部門" clearable>
              <el-option
                v-for="item in depnoList"
                :key="item.DEPNO"
                :label="item.DEPNAME"
                :value="item.DEPNO"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="usercname">
            <el-input v-model="addForm.usercname"></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="userpwd">
            <el-input v-model="addForm.userpwd"></el-input>
          </el-form-item>
          <!--radio-->
          <el-form-item label="權限" prop="systemprivilege">
            <el-radio-group v-model="addForm.systemprivilege">
              <el-radio label="A">管理員</el-radio>
              <el-radio label="B">護理長</el-radio>
              <el-radio label="C">供應室職員</el-radio>
              <el-radio label="D">病房職員</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--checkbox-->
          <template v-for="item in auth" :key="item.oneId">
            <el-form-item :label="item.oneName">
              <el-checkbox
                :label="item.oneId"
                v-model="ids"
                checked
                v-show="false"
              >
              </el-checkbox>
              <el-form-item>
                <el-checkbox-group
                  v-model="ids"
                  v-for="item in item.twoMenuList"
                  :key="item.twoId"
                >
                  <el-checkbox :label="item.twoId">
                    {{ item.twoName }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form-item>
          </template>
        </el-form>
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addAccount">確定</el-button>
          <el-button @click="addDialogVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <!--修改_對話框-->
    <el-dialog
      v-model="editDialogVisible"
      @close="editDialogClosed"
      width="50%"
      title="添加用戶"
    >
      <!--驗證-->
      <template #default>
        <el-form
          ref="addFormRef"
          :model="editForm"
          label-width="80px"
          :rules="addFormRules"
        >
          <el-form-item label="員工編號" prop="userno">
            <el-input v-model="editForm.userno"></el-input>
          </el-form-item>
          <!--修改_下拉選單-->
          <el-form-item label="部門" prop="depno">
            <el-select v-model="editForm.depno" placeholder="部門" clearable>
              <el-option
                v-for="item in depnoList"
                :key="item.DEPNO"
                :label="item.DEPNAME"
                :value="item.DEPNO"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="usercname">
            <el-input v-model="editForm.usercname"></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="userpwd">
            <el-input v-model="editForm.userpwd"></el-input>
          </el-form-item>
          <!--radio-->
          <el-form-item label="權限" prop="systemprivilege">
            <el-radio-group v-model="editForm.systemprivilege">
              <el-radio label="A">管理員</el-radio>
              <el-radio label="B">護理長</el-radio>
              <el-radio label="C">供應室職員</el-radio>
              <el-radio label="D">病房職員</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--checkbox-->
          <template v-for="item in auth" :key="item.oneId">
            <el-form-item :label="item.oneName">
              <el-checkbox
                :label="item.oneId"
                v-model="ids"
                checked
                v-show="false"
              >
              </el-checkbox>
              <el-form-item>
                <el-checkbox-group
                  v-model="ids"
                  v-for="item in item.twoMenuList"
                  :key="item.twoId"
                >
                  <el-checkbox :label="item.twoId">
                    {{ item.twoName }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form-item>
          </template>
        </el-form>
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editAccount">確定</el-button>
          <el-button @click="editDialogVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>