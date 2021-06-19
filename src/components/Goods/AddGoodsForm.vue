<template>
  <el-form
    :model="addForm"
    :rules="addFormRules"
    ref="addFormRef"
    label-width="100px"
    label-position="top"
  >
    <el-tabs
      v-model="tabsIndex"
      tab-position="left"
      :before-leave="beforeTabsLeave"
      @tab-click="emit('tabClick')"
    >
      <el-tab-pane label="基本信息" name="0">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="addForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input
            v-model.number="addForm.goods_price"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input
            v-model.number="addForm.goods_weight"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input
            v-model.number="addForm.goods_number"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="goods_cate">
          <el-cascader
            v-model="addForm.goods_cate"
            :options="cateList"
            :props="cateProps"
            @change="emit('cascadChange')"
          ></el-cascader>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="1">
        <el-form-item
          v-for="item of manyTableData"
          :key="item.attr_id"
          :label="item.attr_name"
        >
          <el-checkbox-group v-model="item.attrVals">
            <el-checkbox
              v-for="attr of item.attrVals"
              :label="attr"
              :key="attr"
              border
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="商品属性" name="2">
        <el-form-item
          v-for="item of onlyTableData"
          :key="item.attr_id"
          :label="item.attr_name"
        >
          <el-checkbox-group v-model="item.attrVals">
            <el-checkbox
              v-for="attr of item.attrVals"
              :label="attr"
              :key="attr"
              border
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="3">
        <el-upload
          :action="uploadURL"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          list-type="picture"
          :headers="uploadHeader"
          :on-success="handleSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="4">
        <QuillEditor
          theme="snow"
          v-model:content="addForm.goods_introduce"
          contentType="text"
        />
        <el-button class="btn-add" @click="emit('addGoods')"
          >添加商品</el-button
        >
      </el-tab-pane>
    </el-tabs>
  </el-form>

  <!-- 图片预览 -->
  <el-dialog title="预览图片" v-model="dialogVisible">
    <img :src="imgSrc" alt="" class="preview-img" />
  </el-dialog>
</template>

<script lang="ts" setup>
import type { State } from '@/views/Goods/AddGoodLogic';
import { useVModels } from '@vueuse/core';
import { ref, useContext } from 'vue';
import { defineEmit, defineProps } from 'vue-demi';
import { ElForm, ElMessage } from 'element-plus';
// editor
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props =
  defineProps<{
    addForm: State['addForm'];
    addFormRules: State['addFormRules'];
    tabsIndex: string;
    cateList: State['cateList'];
    cateProps: State['cateProps'];
    manyTableData: State['manyTableData'];
    onlyTableData: State['onlyTableData'];
    uploadURL: State['uploadURL'];
    uploadHeader: State['uploadHeader'];
  }>();
const emit = defineEmit([
  'update:tabsIndex',
  'update:addForm',
  'update:manyTableData',
  'update:onlyTableData',
  'cascadChange',
  'tabClick',
  'addGoods',
]);

const { tabsIndex, addForm, manyTableData, onlyTableData } = useVModels(
  props,
  emit
);

// 表单 ref
const addFormRef = ref<InstanceType<typeof ElForm>>();

// expose component ref
useContext().expose({
  addFormRef,
});

// tabs before leave hook
const beforeTabsLeave = (activeName: string, oldActiveName: string) => {
  let formValid: boolean | undefined;
  addFormRef.value?.validate((valid) => {
    formValid = valid;
  });
  if (!formValid || !addForm.value.goods_cate.length) {
    ElMessage.warning('请先选择完成表单');
    return false;
  }
};

/*
 * 组件内部维护
 * dialog 查看图片
 */
const dialogVisible = ref(false);
const imgSrc = ref('');
// upload hook
type response = {
  data: {
    tmp_path: string;
    url: string;
  };
};
type file = {
  response: response;
};
// 移除图片
const handleRemove = (file: file) => {
  // 找到图片并删除
  const picPath = file.response.data.tmp_path;
  const picIndex = addForm.value.pics.findIndex((item) => item.pic === picPath);
  addForm.value.pics.splice(picIndex, 1);
};
// 图片预览
const handlePreview = (file: file) => {
  /* 由于后端 Docker 部署，无法获取到公网图片地址 */
  const picPath = file.response.data.tmp_path;
  imgSrc.value = `https://api.defectink.com/shop-admin/${picPath}`;
  dialogVisible.value = true;
};
// 图片上传成功
const handleSuccess = (response: response) => {
  // 保存图片路径到 state
  const picInfo = { pic: response.data.tmp_path };
  addForm.value.pics.push(picInfo);
};
</script>

<style scoped lang="scss">
.el-tabs {
  margin-top: 10px;
}
.el-checkbox {
  margin: 0;
}
.preview-img {
  width: 100%;
}
// editor height
:deep(.ql-container .ql-editor) {
  min-height: 300px;
}
.btn-add {
  margin-top: 10px;
}
</style>
