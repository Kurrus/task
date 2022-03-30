<template>
  <div id="app">
    <Header/>
    <Sidebar/>
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/page-elements/Header";
import Sidebar from "./components/page-elements/Sidebar";
import Footer from "./components/page-elements/Footer";
export default {
  components: {Sidebar, Header, Footer}
}
</script>