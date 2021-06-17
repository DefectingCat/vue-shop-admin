<template>
  <el-dialog title="提示" v-model="assignVisible" width="30%">
    <p>当前用户：{{ toAssign.username }}</p>
    <p>当前角色：{{ toAssign.role_name }}</p>
    <div>
      分配角色：
      <el-select v-model="selectId" placeholder="请选择">
        <el-option
          v-for="item in rolesList"
          :key="item.id"
          :label="item.roleName"
          :value="item.id"
        >
          <span style="float: left">{{ item.roleName }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{
            item.roleDesc
          }}</span>
        </el-option>
      </el-select>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="assignVisible = false">取 消</el-button>
        <LoadingBtn
          msg="确定"
          :loading="loading"
          @btn-click="emit('confirmClick')"
        />
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useVModels } from '@vueuse/core';
import { defineEmit } from 'vue';
import { defineProps } from 'vue-demi';
// 登录加载按钮
import LoadingBtn from '@/components/common/LoadingBtn.vue';
import type { State } from '@/views/User/UserLogic';

const props =
  defineProps<{
    assignVisible: boolean;
    toAssign: {
      username: State['userList'][1]['username'];
      role_name: State['userList'][1]['role_name'];
    };
    rolesList: State['rolesList'];
    selectId: number | string;
    loading: boolean;
  }>();

const emit = defineEmit([
  'update:assignVisible',
  'update:selectId',
  'confirmClick',
]);

const { assignVisible, selectId } = useVModels(props, emit);
</script>

<style scoped lang="scss"></style>
