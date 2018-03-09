<template>
	<div class="ui success message" @click="HideMessage" hidden="true">
    <i class="close icon"></i>
    <div class="header">
      {{ message }}
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  data () {
    return {
      message: 'Your action was successful.',
    };
  },
  methods: {
    HideMessage: function () {
      $('.message').hide();
    },
  },
};
</script>
