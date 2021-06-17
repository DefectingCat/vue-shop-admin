<template>
  <el-table :data="goodsList" stripe class="goods-table-loading">
    <el-table-column type="index"></el-table-column>
    <el-table-column label="商品名称" prop="goods_name"></el-table-column>
    <el-table-column
      label="商品价格（元）"
      prop="goods_price"
      width="180"
    ></el-table-column>
    <el-table-column
      label="商品数量"
      prop="goods_number"
      width="180"
    ></el-table-column>
    <el-table-column
      label="创建时间"
      prop="add_time"
      width="180"
    ></el-table-column>
    <el-table-column label="操作" width="180">
      <template #default>
        <!-- <ElTooltip effect="light" content="编辑商品" placement="top"> -->
        <el-button size="mini" icon="el-icon-edit"></el-button>
        <!-- </ElTooltip> -->
        <!-- <ElTooltip effect="light" content="删除商品" placement="top"> -->
        <el-button size="mini" icon="el-icon-delete" type="danger"></el-button>
        <!-- </ElTooltip> -->
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue-demi';
import type { State } from '@/views/Goods/GoodsLogic';

defineProps<{
  goodsList: State['goodsList'];
}>();
</script>

<style scoped lang="scss"></style>
