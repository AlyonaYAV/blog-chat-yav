<template>
  <div class="sidebar__block">
    <slot name="header"></slot>
    <ul>
      <li v-for="blockDataItem of blockData" :key="blockDataItem.id">
        <span>
          <nuxt-link v-if="blockType === 'posts'"
            :to="`/${blockUrlPart}/${blockDataItem.id}`" append>
            {{ blockDataItem.title }}
          </nuxt-link>
          <nuxt-link v-else-if="blockType === 'pages'"
            :to="`/${blockUrlPart}/${blockDataItem.reference}`" append>
            {{ blockDataItem.title }}
          </nuxt-link>
        </span>
        <span>
          {{ blockInfo === 'views' ? blockDataItem.views : blockDataItem.date }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    blockData: { type: Array },
    blockType: { type: String },
    blockUrlPart: { type: String },
    blockInfo: { type: String }
  }
}
</script>

<style lang="scss" scoped>
.sidebar__block{
  &:first-child{
    margin-top: 1.2em;
  }
    border: 1px solid #747272;
    margin-bottom: 1.2em;
    h4{
      color: #f7f2f1;
      padding: .2em;
      text-align: center;
      background-color: lighten($color: #cc6699, $amount: 10);
    }
    ul{
      padding: .2em;
      li{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-family: Arial, Helvetica, sans-serif;
        font-size: .9em;
        padding-bottom: .3em;
        span:first-child{
          a{
            color: #000;
            text-decoration: none;
            transition: .5s padding-left;
            &:hover, &:active{
              padding-left: .1em;
              color: #ee6ebd;
              font-weight: bold;
            }
          }
        }
        span:last-child{
          font-weight: bold;
        }
      }
    }
  }
</style>