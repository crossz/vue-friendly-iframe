<template>
<div class="vue-friendly-iframe">
</div>
</template>

<script>
import uuidV1 from 'uuid/v1';

import utils from 'src/utils/utils';

function generateGuid() {
  return uuidV1();
}

export default {
  name: 'friendly-iframe',
  props: {
    src: {
      type: String,
      required: true
    },
    crossorigin: {
      type: String,
      required: false,
      default: 'anonymous'
    },
    target: {
      type: String,
      required: false,
      default: '_parent'
    },
    className: {
      type: String,
      required: false
    },
    allow: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    sandbox: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      iframeEl: null,
      iframeLoadedMessage: `IFRAME_LOADED_${generateGuid()}`,
      iframeOnReadyStateChangeMessage: `IFRAME_ON_READ_STATE_CHANGE_${generateGuid()}`
    };
  },
  computed: {},
  watch: {
    src() {
      this.reinitIframe(this);
    }
  },
  methods: {
    removeIframe() {
      while (this.$el.firstChild) {
        this.$el.removeChild(this.$el.firstChild);
      }
    },
    setIframeUrl() {
      if (this.iframeEl.contentWindow === null) {
        setTimeout(this.setIframeUrl)
        return;
      }
      const iframeDoc = this.iframeEl.contentWindow.document;
      iframeDoc.open()
        .write(
          `
          <body onload="window.location.replace('${this.src}'); parent.postMessage('${this.iframeLoadedMessage}', '*')"></body>
          <script>
            window.document.onreadystatechange = function () {
              if (window.document.readyState === 'complete') {
                parent.postMessage('${this.iframeOnReadyStateChangeMessage}', '*')
              }
            };
          <\/script>
          `
        );

      iframeDoc.close(); //iframe onload event happens
    },
    reinitIframe: utils.debounce(vm => {
      // console.log(vm);
      vm.removeIframe();
      vm.initIframe();
    }, 200),
    
    initIframe() {
      this.iframeEl = document.createElement('iframe');
      this.iframeEl.setAttribute('style', 'visibility: hidden; position: absolute; top: -99999px; border: none;');
      if (this.src) this.iframeEl.setAttribute('iframe-src', this.src);
      if (this.className) this.iframeEl.setAttribute('class', this.className);
      if (this.class) this.iframeEl.setAttribute('class', this.class);
      if (this.crossorigin) this.iframeEl.setAttribute('crossorigin', this.crossorigin);
      if (this.target) this.iframeEl.setAttribute('target', this.target);
      if (this.allow) this.iframeEl.setAttribute('allow', this.allow);
      if (this.name) this.iframeEl.setAttribute('name', this.name);
      if (this.title) this.iframeEl.setAttribute('title', this.title);
      if (this.sandbox) this.iframeEl.setAttribute('sandbox', this.sandbox);

      this.$el.appendChild(this.iframeEl);

      this.setIframeUrl();
    },
    listenForEvents() {
      // Create IE + others compatible event handler
      const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
      const eventer = window[eventMethod];
      const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

      // Listen to message from child window
      eventer(messageEvent, event => {
        if (event.data === this.iframeLoadedMessage) {
          this.$emit('iframe-load');

          this.iframeEl.setAttribute('style', 'visibility: visible; border: none;');
        }

        if (event.data === this.iframeOnReadyStateChangeMessage) {
          this.$emit('load');
        }
      }, false);
    }
  },
  mounted() {
    this.listenForEvents();

    this.initIframe();
  }
};
</script>
