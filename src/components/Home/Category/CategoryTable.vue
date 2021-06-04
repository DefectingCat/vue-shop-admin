<template>
  <el-table
    :data="tableData"
    stripe
    row-key="cat_id"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <!-- <el-table-column type="index"> </el-table-column> -->
    <el-table-column label="分类名称" prop="cat_name"> </el-table-column>
    <el-table-column label="是否有效" prop="cat_deleted" width="200">
      <template #default="scope">
        <i class="el-icon-circle-check" v-if="!scope.row.cat_deleted"></i>
        <i class="el-icon-circle-close" v-else></i>
      </template>
    </el-table-column>
    <el-table-column label="分类级别" prop="cat_level" width="200">
      <template #default="scope">
        <!-- 三级判断 -->
        <el-tag
          type=""
          size="mini"
          effect="plain"
          v-if="scope.row.cat_level === 0"
        >
          一级
        </el-tag>
        <el-tag
          type="success"
          size="mini"
          effect="plain"
          v-if="scope.row.cat_level === 1"
        >
          二级
        </el-tag>
        <el-tag
          type="warning"
          size="mini"
          effect="plain"
          v-if="scope.row.cat_level === 2"
        >
          三级
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template #default>
        <ElTooltip effect="light" content="编辑分类" placement="top">
          <el-button size="mini" icon="el-icon-edit"></el-button>
        </ElTooltip>
        <ElTooltip effect="light" content="删除分类" placement="top">
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
          ></el-button>
        </ElTooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import {
  ElTable,
  ElTableColumn,
  ElTag,
  ElButton,
  ElTooltip,
} from 'element-plus';
import { defineProps } from 'vue-demi';
import type { State } from '@/views/Home/Category/CategoryLogic';

defineProps<{
  tableData: State['categoriesList'];
}>();
</script>

<style scoped lang="scss"></style>
