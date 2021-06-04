<template>
  <ElTable :data="goodsList" stripe class="goods-table-loading">
    <ElTableColumn type="index"></ElTableColumn>
    <ElTableColumn label="商品名称" prop="goods_name"></ElTableColumn>
    <ElTableColumn
      label="商品价格（元）"
      prop="goods_price"
      width="180"
    ></ElTableColumn>
    <ElTableColumn
      label="商品数量"
      prop="goods_number"
      width="180"
    ></ElTableColumn>
    <ElTableColumn label="创建时间" prop="add_time" width="180"></ElTableColumn>
    <ElTableColumn label="操作" width="180">
      <template #default>
        <ElTooltip effect="light" content="编辑商品" placement="top">
          <el-button size="mini" icon="el-icon-edit"></el-button>
        </ElTooltip>
        <ElTooltip effect="light" content="删除商品" placement="top">
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
          ></el-button>
        </ElTooltip>
      </template>
    </ElTableColumn>
  </ElTable>
</template>

<script lang="ts" setup>
import { ElButton, ElTable, ElTableColumn, ElTooltip } from 'element-plus';
import { defineProps } from 'vue-demi';
import type { State } from '@/views/Home/Goods/GoodsLogic';

defineProps<{
  goodsList: State['goodsList'];
}>();
</script>

<style scoped lang="scss"></style>
