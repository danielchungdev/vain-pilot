<template>
 <router-view />
</template>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.navBar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #333333;
}
.navBar > h1 {
  padding: 0.5%;
  padding-left: 2%;
  color: #FFFFFF;
  font-family: 'Times New Roman', Times, serif;
}
.links > a {
  text-decoration: none;
  color: #FFFFFF;
  padding: 10px;
  font-size: 18px;
}
.links > a.active {
  font-weight: bolder;
}
.links > a:last-of-type {
  padding-right: 20px;
}
.links > a:hover {
  color: #737373;
}
</style>