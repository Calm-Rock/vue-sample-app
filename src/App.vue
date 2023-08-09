<template>
  <div id="app">
    <div class="header">
      <img src="@/assets/signoz_logo.svg" alt="Vue Logo" class="logo left" />
      Sample SigNoz Vue Instrumentation App
      <img src="@/assets/logo.png" alt="SigNoz Logo" class="logo right" />
    </div>
    <button @click="fetchData">Fetch Data</button>
    <div v-if="x.entries.length > 0">
      <transition name="fade">
        <table class="data-table">
          <thead>
            <tr>
              <th v-for="attribute in attributes" :key="attribute">{{ attribute }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, index) in x.entries" :key="index">
              <td v-for="attribute in attributes" :key="attribute">{{ entry[attribute] }}</td>
            </tr>
          </tbody>
        </table>
      </transition>
    </div>
    <div v-else>
      <div v-if="loading" class="loading">
        🤟 Loading...
      </div>
      <div v-else class="fetch-data">
        Fetch data by clicking on Fetch
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      x: { entries: [] },
      attributes: ['API', 'Description', 'Auth', 'HTTPS', 'Cors', 'Link', 'Category'],
      loading: false
    };
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true;
        const response = await axios.get('https://api.publicapis.org/entries');
        this.x = response.data;
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.x = { entries: [] };
        this.loading = false;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.header {
  background-color: #ffd2b9;
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

button {
  background-color: #eb5533;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.data-table-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #242526;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
}

.data-table {
  border-collapse: collapse;
  width: 100%;
}

.data-table th,
.data-table td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.data-table th {
  background-color: #242526;
  color: #fffafa;
}

.data-row {
  background-color: #2c2c2c;
  border: 1px solid #3a3a3a;
}

.loading,
.fetch-data {
  margin-top: 20px;
  font-size: 18px;
  padding: 10px;
  border-radius: 5px;
}

/* Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.logo {
  width: 40px;
  margin: 0 10px;
}

.left {
  float: left;
}

.right {
  float: right;
}
</style>
