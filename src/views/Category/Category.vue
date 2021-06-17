<template>
  <!-- 面包屑导航 -->
  <Breadcrumb>
    <template #l1> 商品管理 </template>
    <template #l2> 商品分类 </template>
  </Breadcrumb>

  <el-card>
    <!-- 添加按钮 -->
    <el-button type="primary" plain @click="openDialog"> 添加分类 </el-button>

    <!-- 表格 -->
    <CategoryTable
      :tableData="categoriesList"
      @edit="openEdit"
      @delete="deleteCategory"
    />

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="categoriesTotal"
    />

    <!-- 添加分类 dialog -->
    <CategoryForm
      v-model:addCateForm="addCateForm"
      :addCateRules="addCateRules"
      :cascaderOptions="cascaderOptions"
      :cascaderProps="cascaderProps"
      v-model:cascaderValue="cascaderValue"
      :loading="loading"
      v-model:visible="visible"
      @cateChange="cateChange"
      ref="formRef"
      @btnClick="addCategory"
    />

    <!-- 编辑分类 dialog -->
    <CategoryForm
      v-model:addCateForm="editCateForm"
      :addCateRules="addCateRules"
      :loading="loading"
      v-model:visible="editVisible"
      ref="editFormRef"
      @btnClick="editCategory"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { toRefs } from '@vueuse/core';
// common components
import Breadcrumb from '@/components/common/Breadcrumb.vue';
// logical
import categoryLogic from './CategoryLogic';
import addCategories from './addCategories';
import editCategories from './editCategories';
// children
import CategoryTable from '@/components/Category/CategoryTable.vue';
import CategoryForm from '@/components/Category/CategoryForm.vue';

// basic logical
const { state, handleSizeChange, handleCurrentChange } = categoryLogic();
const {
  categoriesList,
  queryInfo,
  categoriesTotal,
  addCateForm,
  addCateRules,
  cascaderOptions,
  cascaderProps,
  cascaderValue,
  loading,
  visible,
  editCateForm,
  editVisible,
} = toRefs(state);

// add category
const { openDialog, cateChange, formRef, addCategory } = addCategories(state);
// edit category
const { openEdit, editFormRef, editCategory, deleteCategory } =
  editCategories(state);
</script>

<style scoped lang="scss">
.el-pagination {
  margin-top: 15px;
}
</style>
