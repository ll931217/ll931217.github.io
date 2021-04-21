<template lang="pug">
  #sayhi.mt-10
    v-container
      v-row
        v-col(sm="12", md="6")
          .d-flex.justify-center
            #sayhi-form
              h1 Say Hi
              v-form(
                ref="form",
                v-model="valid",
                lazy-validation
              )
                v-text-field(
                  v-model="name",
                  :rules="nameRules",
                  label="Name",
                  required
                )

                v-text-field(
                  v-model="email",
                  :rules="emailRules",
                  label="Email",
                  required
                )

                v-textarea(
                  v-model="message"
                  label="Message"
                )

                v-btn(
                  :disabled="!valid",
                  color="success",
                  @click="validate"
                ) Send
        v-col(sm="12", md="6")
          .d-flex.justify-center
            #other-contact.d-flex.flex-column.justify-space-around.text-center
              p +886965423311
              a(href="mailto:liangshihlin@gmail.com") liangshihlin@gmail.com
              p Taipei, Taiwan ROC, 105

              #social-media-links.mt-10
                p Find me on social media
                .social-links
                  fa-icon(:icon="['fab', 'facebook']").mr-2
                  fa-icon(:icon="['fab', 'twitter']").mr-2
                  fa-icon(:icon="['fab', 'github']").mr-2
                  fa-icon(:icon="['fab', 'codepen']").mr-2
                  fa-icon(icon="envelope-open-text")
</template>

<script>
export default {
  name: 'SayHi',
  data: () => ({
    valid: false,
    name: '',
    nameRules: [
      v => !!v || 'Name is required'
    ],
    email: '',
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.text(v) || 'Must be a valid email'
    ],
    message: ''
  }),
  methods: {
    validate() {
      this.$refs.form.validate()
    }
  }
}
</script>

<style lang="sass" scoped>
#sayhi-form, #other-contact
  width: 70%

#other-contact
  background-color: #2d3436
  border-radius: 8px
  color: #dfe6e9
  font-size: 1.5rem
  padding: 3rem
</style>
