<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          travel v1.0.1
        </v-card-title>
        <v-card-text>
          <div>
            <v-text-field v-model="token" prefix="token : " placeholder="入力してください"></v-text-field>
          </div>
          <v-spacer />
        </v-card-text>
      </v-card>
        <v-card-text>
          <div>
            <v-text-field v-model="exp" prefix="exp : " disabled></v-text-field>
            <v-text-field v-model="gold" prefix="gold : " disabled></v-text-field>
            <v-text-field v-model="text" prefix="Text : " disabled></v-text-field>
          </div>
          <v-spacer />
        </v-card-text>
      <!-- <v-card>
        <iframe id="inlineFrame" width="100%" height="610px" src="https://web.simple-mmo.com/travel"></iframe>
      </v-card> -->
      <v-card>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            v-on:click="onAtk"
          >
            {{playBtnName}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      reqestData: {},
      token: 'ZpN8Hovclti2W2XlzPh1UCWs89NGSQferZ7JIgBVkBduhr59AuLgG5fPgVI4',
      exp: '-',
      gold: '-',
      text: '-',
      playBtnName: 'Attack',
      timer: null,
      interval: 8500,
    }
  },
  methods: {
    onAtk() {
      if (this.playBtnName === 'Wait') {
        return false
      }

      this.playBtnName = 'Wait'


      this.api()
      this.timer = setTimeout(this.api, this.interval)
    },
    getCreateReqest() {
      const sec = new Date().getSeconds()
      return {
        "api_token": this.token,
        "d_1": 120 + sec,
        "d_2": 220 + sec,
        "s": false
      }
    },
    api() {
      this.playBtnName = 'Wait'
      const response = this.$axios({
        method: 'POST',
        url: 'https://api.simple-mmo.com/api/travel/perform/f4g5l4l3k',
        headers: {'Access-Control-Allow-Origin': '*'},
        data: this.getCreateReqest()
      }).then((res) => {
        console.log("result", res)
        this.playBtnName = 'Attack'
        this.updateMsg(res.data)

        clearTimeout(this.timer)
        this.timer = null

        if (res.data.step_type) {
          this.timer = setTimeout(this.api, this.interval)
        }
        else {
          this.text = 'bot!'
        }

      }).catch(() => {
        this.text = 'Error!'
        clearTimeout(this.timer)
        this.timer = null
      })
    },
    updateMsg(data) {
      this.exp = data.exp_amount + ''
      this.gold = data.gold_amount + ''
      if (data.step_type === "text") {
        this.text = data.text
      }
      else if (data.step_type === "item") {
        this.text = data.heading
      }
    }
  }
}
</script>
