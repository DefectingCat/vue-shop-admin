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
        <el-form-item label="商品分类" prop="goods_cat">
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
      <el-tab-pane label="商品图片" name="3"> </el-tab-pane>
      <el-tab-pane label="商品内容" name="4"> </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script lang="ts" setup>
import type { State } from '@/views/Goods/AddGoodLogic';
import { useVModels } from '@vueuse/core';
import { ref, useContext } from 'vue';
import { defineEmit, defineProps } from 'vue-demi';
import { ElMessage } from 'element-plus';

const props =
  defineProps<{
    addForm: State['addForm'];
    addFormRules: State['addFormRules'];
    tabsIndex: string;
    cateList: State['cateList'];
    cateProps: State['cateProps'];
    manyTableData: State['manyTableData'];
    onlyTableData: State['onlyTableData'];
  }>();
const emit = defineEmit([
  'update:tabsIndex',
  'update:addForm',
  'update:manyTableData',
  'update:onlyTableData',
  'cascadChange',
  'tabClick',
]);

const { tabsIndex, addForm, manyTableData, onlyTableData } = useVModels(
  props,
  emit
);

const addFormRef = ref();

// expose component ref
useContext().expose({
  addFormRef,
});

// tabs before leave hook
const beforeTabsLeave = (activeName: string, oldActiveName: string) => {
  if (!addForm.value.goods_cate.length) {
    ElMessage.warning('请先选择商品分类');
    return false;
  }
};
</script>

<style scoped lang="scss">
.el-tabs {
  margin-top: 10px;
}
.el-checkbox {
  margin: 0;
}
</style>
