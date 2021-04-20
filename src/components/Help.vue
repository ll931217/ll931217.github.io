<template lang="pug">
  #help
    .header
      h1 [Help]
      blockquote This will show you how to use the commands available here. Ignore the X to clear the input box, that is just me playing around with some styling for future use.
      h2 Commands
      p Bookmarks and todos are saved to your localStorage.
    .google
      h3.snippet
        span Google
      p Anything entered that doesn't start with "bookmark" or "todo" will become google search.
      p.code What is VueJS?
    .todo
      h3.snippet
        span todo
      p A command to either add or delete a todo.
      h4 Add a todo
      p.code
        span.command todo add&nbsp;
        | "Feed the cat"
      h4 Remove a todo
      p.code
        span.command todo remove&nbsp;
        | "Take out the trash"
    .bookmark
      h3.snippet
        span bookmark
      p A command to either add or delete a bookmark.
      h4 Add a bookmark
      p.code
        span.command bookmark add&nbsp;
        | --name="Google" --url="https://www.google.com/"
      p.pink or
      p.code
        span.command bookmark add&nbsp;
        | -n "Google" -u "https://www.google.com/"
      h4 Remove a bookmark
      p.code
        span.command bookmark remove&nbsp;
        | --name="Google"
      p.pink or
      p.code
        span.command bookmark remove&nbsp;
        | -n "Google"
</template>

<script>
export default {
  name: 'Help'
}
</script>

<style lang="sass" scoped>
  #help
    display: grid
    font-family: 'Play', sans-serif
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr
    grid-auto-rows: auto
    grid-template-areas: "header header header header header" "google google bookmark bookmark bookmark" "todo todo bookmark bookmark bookmark"
    grid-gap: 1em

    @media (max-width: 500px)
      grid-template-areas: "header header header header header" "google google google google google" "todo todo todo todo todo" "bookmark bookmark bookmark bookmark bookmark"

  .header
    grid-area: header

  .google
    grid-area: google

  .bookmark
    grid-area: bookmark

  .todo
    grid-area: todo

  h1
    margin-bottom: .65em

  h2, h3, h4, p
    margin-bottom: .4em

  h2
    font-size: 2em

  h3
    font-size: 1.7em

  h4
    font-size: 1.4em

  p
    font-size: 1em
    color: rgb(49, 181, 217)

  .pink
    color: #BF55EC

  .code, .snippet
    font-family: 'Fira Code', monospace

  .snippet
    span
      background-color: rgba(140, 245, 255, 0.28)
      padding: .25em .5em

  .code
    border-left: 3px solid rgb(56, 148, 255)
    padding: .5em 1em

  .command
    color: #00ff9d
</style>
