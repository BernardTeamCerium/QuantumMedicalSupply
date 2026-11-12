(function(){
  var listeners={}, READY={init:1,pageLoaded:1,visible:1}, noop=function(){};
  var SE={INIT:'init',PAGE_LOADED:'pageLoaded',VISIBLE:'visible',HIDDEN:'hidden',INTERACTION:'interaction',
    HOSTPAGE_SCROLL:'hostpageScroll',FULLSCREEN_SUPPORT:'fullscreenSupport',FULLSCREEN_DIMENSIONS:'fullscreenDimensions',
    FULLSCREEN_EXPAND_START:'fsExpandStart',FULLSCREEN_EXPAND_FINISH:'fsExpandFinish',
    FULLSCREEN_COLLAPSE_START:'fsCollapseStart',FULLSCREEN_COLLAPSE_FINISH:'fsCollapseFinish',
    EXPAND_START:'expandStart',EXPAND_FINISH:'expandFinish',COLLAPSE_START:'collapseStart',COLLAPSE_FINISH:'collapseFinish'};
  window.studio=window.studio||{}; window.studio.events=window.studio.events||{}; window.studio.events.StudioEvent=SE;
  var E={
    addEventListener:function(t,cb){(listeners[t]=listeners[t]||[]).push(cb); if(READY[t])setTimeout(function(){try{cb({});}catch(e){}},0);},
    removeEventListener:function(t,cb){var a=listeners[t];if(a){var i=a.indexOf(cb);if(i>=0)a.splice(i,1);}},
    dispatchEvent:function(t){var a=listeners[t]||[];for(var i=0;i<a.length;i++){try{a[i]({});}catch(e){}}},
    isInitialized:function(){return true;},isPageLoaded:function(){return true;},isVisible:function(){return true;},
    isServingInLiveEnvironment:function(){return false;},isServingInLiveDcrfEnvironment:function(){return false;},
    exit:function(id,url){if(url)window.open(url,'_blank');},exitOverride:function(id,url){if(url)window.open(url,'_blank');},
    exitQueryString:noop,counter:noop,reportManualClose:noop,
    loadModule:function(n,cb){if(typeof cb==='function')setTimeout(cb,0);},
    setProfileId:noop,setContentSourceType:noop,setRushSimulatedLocalEvents:noop,setResponsiveSize:noop,setResponsiveExpanding:noop,
    startTimer:noop,stopTimer:noop,requestExpand:noop,requestCollapse:noop,finishExpand:noop,finishCollapse:noop,
    requestFullscreenExpand:noop,requestFullscreenCollapse:noop,finishFullscreenExpand:noop,finishFullscreenCollapse:noop,
    queryFullscreenSupport:noop,getFullscreenDimensions:function(){return {width:0,height:0};},getUrl:function(u){return u;},
    getParameter:noop,setStartExpanded:noop,setIsMultidirectional:noop,init:noop
  };
  window.Enabler=E; window.studio.Enabler=E;
  function fire(){['init','pageLoaded','visible'].forEach(function(t){E.dispatchEvent(t);});}
  if(document.readyState==='complete')setTimeout(fire,0); else window.addEventListener('load',function(){setTimeout(fire,0);});
})();
