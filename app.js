new Vue({
    el: '#exercise',
    data: {
        rawStyle: '',
        obliqueBool: false,
        italicBool: false,
        classInput: '',
        classBoolean: '',
        steveBool: false,
        bennyBool: false,
        gbgBool: false, //green background Boolean
        ybgBool: false, //yellow background Boolean
        obgBool: false, //orange background Boolean
        active: false, //whether or not effect is active Boolean
        label: 'Turn On', //Stores button label
        highlightBool: false, //Highlight Boolean
        shrinkBool: false, //Shrink Boolean
        timer: null, //Used to store setinterval(), so we can clear it at will
        progressTimer: null,
        progressStyle: {'background-color':'green','height':'10px'},
        barProgress: {'width':'1px'},
        barWidth: 0,
        backgroundClass: ''
    },
    methods: {
        steveBenny: function() {
            if(this.classInput === 'steve' && this.classBoolean === 'true'){
                this.steveBool = true
                this.bennyBool = false
                this.obliqueBool = true
            } else if(this.classInput === 'steve' && this.classBoolean === 'false'){
                this.italicBool = false
                this.obliqueBool = false
                this.steveBool = false
                this.bennyBool = false
            } else if(this.classInput === 'benny' && this.classBoolean === 'true'){
                this.bennyBool = true
                this.italicBool = true
                this.steveBool = false
            } else if(this.classInput === 'benny' && this.classBoolean === 'false'){
                this.italicBool = false
                this.obliqueBool = false
                this.bennyBool = false
                this.steveBool = false
            }
        },
        effectTimer: function() {
            this.buttonEffect()
            this.label = 'Turn Off'
            this.timer = setInterval(this.buttonEffect, 500)
        },
        buttonEffect: function(){
                    if(this.highlightBool){
                      this.shrinkBool = true
                      this.highlightBool = false
                    }else{
                      this.shrinkBool = false
                      this.highlightBool = true
                    }
        },
        stopEffect: function(){
          clearInterval(this.timer)
            this.label = 'Turn On'
            this.highlightBool = false
            this.shrinkBool = false
        },
        startProgress: function() {
            this.progressBar()
            this.progressTimer = setInterval(this.progressBar, 100)
        },
        progressBar: function() {
            if(this.barWidth < 100) {
                this.barProgress = {'width':'' + this.barWidth++ + 'px'}
            } else {
                clearInterval(this.progressTimer)
            }

        },
        resetProgress: function() {
            this.barProgress = {'width' : '0px'}
            this.barWidth = 0
            clearInterval(this.progressTimer)
        }
    },
    computed :{
      styleObject: function() {
          //Doesn't this seem overly complex ?
          var string1 = this.rawStyle.split(':')[0] || 'color'
          var string2 = this.rawStyle.split(':')[1] || 'black'
          return {[string1]:[string2]}
      }
    },
    watch: {
        active: function(){
            if(this.active === true){
                this.effectTimer()
            }else{
                this.stopEffect()
            }
        },
        backgroundClass: function(){

          this.gbgBool = false
          this.ybgBool = false
          this.obgBool = false

          if(this.backgroundClass === 'green'){
            this.gbgBool = true
          }else if(this.backgroundClass === 'orange'){
            this.obgBool = true
          }else if(this.backgroundClass === 'yellow'){
            this.ybgBool = true
          }
        },
        classInput: function(){
            this.steveBenny()
        },
        classBoolean: function(){
            this.steveBenny()
        }
    }
})