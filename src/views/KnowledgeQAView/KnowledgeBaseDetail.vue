<template>
  <div class="knowledge-base-detail">
    <h1>{{ knowledgeBaseName }}</h1>
    <!-- 知识库详情页面的内容 -->
  </div>
</template>

<script>
export default {
  name: 'KnowledgeBaseDetail',
  props: ['id', 'name'], // 接收props参数
  data() {
    return {
      knowledgeBaseName: this.name || '未命名知识库'
    }
  },
  watch: {
    '$route'(to) {
      // 路由变化时更新名称
      this.knowledgeBaseName = to.query.name || '未命名知识库';
    }
  }
}
</script>

<style scoped>
.knowledge-base-detail {
  padding: 20px;
}
</style>