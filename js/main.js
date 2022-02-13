 var formPage = 1;
 var formHead = 1;
 var formSection = 1;
 var nextBtnInterval;
 var isType_internalChecked = $("#type_internal")[0].checked;
 var isType_cloudinfraChecked = $("#type_cloudinfra")[0].checked;
 var isType_externalChecked = $("#type_external")[0].checked;
 var isType_webappChecked = $("#type_web")[0].checked;
 var isPCIDSSChecked  = $("#standards_pcidss")[0].checked;
 var results = [];



$(function() {
   resizeProgressBox();
   $(".formExpDiv").height();
   $(".formExpHoverController").height($(".formExpDiv").height() + $(".formExpBtn").height() + parseInt($(".formExpDiv").css("padding").slice(0,-2)) + parseInt($(".formExpDiv").css("bottom").slice(0,-2)));
   var nextBtnInterval;

   $("#goToForm").click(function(){
      var form = $(".formItself")

      $('div.' + "formItself")[0].scrollIntoView({ behavior: 'smooth', block: 'start'});
      

   });

   setForm(formSection);
   activateHeaders(formPage);
   activateProgress(formPage);


   $(".formNextBtn").click(function(){
      if (currentForm(formSection).find("form").validate().checkForm()) {
          currentForm(formSection).hide();

          //Update variables due to a bug
          isType_internalChecked = $("#type_internal")[0].checked;
          isType_cloudinfraChecked = $("#type_cloudinfra")[0].checked;
          isType_externalChecked = $("#type_external")[0].checked;
          isType_webappChecked = $("#type_web")[0].checked;
          isPCIDSSChecked  = $("#standards_pcidss")[0].checked;

          formSection++;
          console.log("form section: " + formSection)
          
          

          if (formSection == 6) {
            $(".formNextPrev").hide();
            $(".formFinish").show();
          };

          setForm(formSection);
          activateHeaders(formPage);
          $(".progress").removeClass("currentProgress");
          activateProgress(formPage);
          
          
          nextForm(formSection).fadeIn(200);

          $(".formPrevBtn").addClass("active");

      } else {
          currentForm(formSection).find("form").valid();
      }
  });

  $(".progress").on( "click", function() {
      if ($(this).hasClass("active")) {
        $(".progress").removeClass("currentProgress");
        var clickedProgress = $(this).index() + 1;
        $(".formPage").hide();
        $(".formSection").hide();
        if (clickedProgress == 1) {
          $(".formPage[data-page='" + clickedProgress +"']").show();
          $(".formPage[data-page='" + clickedProgress +"']").children(".formSection").first().show();
          $(".formHead").show();
          $(".headerSection").show();
          $(".headerSection a").removeClass("active");
          $(".headerSection a:first-child").addClass("active");

          $(".formPrevBtn").removeClass("active");

        } else {
          $(".formPage[data-page='" + clickedProgress +"']").show();
          $(".formPage[data-page='" + clickedProgress +"']").children(".formSection").show();
          $(".headerSection").hide();
          $(".formHead").hide();
          $(".headerSection a").removeClass("active");
        }
        $(".progress").removeClass("currentProgress");
        $(".progress[data-progress='" + clickedProgress +"']").addClass("currentProgress");

        
        formSection = clickedProgress;

        

        console.log(clickedProgress);

      }
        
  });

  $(".headerSection a").on( "click", function() {
    var clickedProgress = $(this).index() + 1;
    if ($(this).attr("data-headerButton") == 2) {
      if (currentForm(formSection).find("form").validate().checkForm()) {
        formSection = 1;
        var thisSection = $(this).attr("data-headerButton");
        $(".headerSection a").removeClass("active");
        $(this).addClass("active");
        $(".formPage .formSection").hide();
        $(".formSection[data-section='" + thisSection +"']").show();
        $(".formPrefBtn").removeClass("active");
        console.log("formsection" + formSection)
      } else {
        currentForm(formSection).find("form").valid();
      }
        
    } else {
      console.log("second form sec");
      formSection = 2;
      var thisSection = $(this).attr("data-headerButton");
      $(".headerSection a").removeClass("active");
      $(this).addClass("active");
      $(".formPage .formSection").hide();
      $(".formSection[data-section='" + thisSection +"']").show();
      $(".formNextBtn").removeClass("active");
      console.log("formsection" + formSection)
    }
  });

  $(".formPrevBtn").on('click',function() {
     if ($(this).hasClass("active")) {
        currentForm(formSection).hide();
        //Update variables due to a bug
        
        isType_internalChecked = $("#type_internal")[0].checked;
        isType_cloudinfraChecked = $("#type_cloudinfra")[0].checked;
        isType_externalChecked = $("#type_external")[0].checked;
        isType_webappChecked = $("#type_web")[0].checked;
        isPCIDSSChecked  = $("#standards_pcidss")[0].checked;
        formSection--;
        if (formSection < 6) {
          $(".formNextPrev").show();
          $(".formFinish").hide();
        };
        setForm(formSection);
        activateHeaders(formPage);
        $(".progress").removeClass("currentProgress");
        activateProgress(formPage);
        nextForm(formSection).fadeIn(200);
        $(".formNextBtn").addClass("active");
     }
        

      if (formSection == 1) {
        $(".formPrevBtn").removeClass("active");
      }
  });
  

  var dateFormat = "yy/mm/dd",
      from = $( "#info_date_from" )
        .datepicker({
          defaultDate: "+1w",
          dateFormat: 'yy-mm-dd',
          changeMonth: true,
          numberOfMonths: 2
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
          $(this).valid();
        }),
      to = $( "#info_date_to" ).datepicker({
        defaultDate: "+1w",
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        numberOfMonths: 2
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
        $(this).valid();
      });
 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }
   

    $("input#standards_regulatory").click(function(){
      if ($("#standards_regulatory")[0].checked) {
        $("#regulator").show();
      }else{
        $("#regulator").hide();
      }

    });

    $("input#standards_pcidss").click(function(){
      isPCIDSSChecked = $("#standards_pcidss")[0].checked;
          $("input#type_external").click();
          $("input#type_internal").click();
          $("input#type_web").click();

    });

    $("input#type_web").click(function(){
        isType_webappChecked = $("#type_web")[0].checked;
        if (isType_webappChecked) {
          $(".ICC_Type_Web").show();
        } else {
          $(".ICC_Type_Web").hide();
        }
    });

    $("input#type_cloudinfra").click(function(){
        isType_cloudinfraChecked = $("#type_cloudinfra")[0].checked;
        if (isType_internalChecked && isType_cloudinfraChecked) {
          $(".ICC_Type_Internal_Segmentation").show();
        } else {
          $(".ICC_Type_Internal_Segmentation").hide();
        }

        if (isType_cloudinfraChecked) {
          $(".typeSegmentationShow").show();
        }
    });

    $("input#type_external").click(function(){
        isType_externalChecked = $("#type_external")[0].checked;
        if (isType_internalChecked && isType_externalChecked) {
          $(".ICC_Type_Internal_External").show();
        } else {
          $(".ICC_Type_Internal_External").hide();
        }

        if (isType_externalChecked) {
          $(".typeExternalShow").show();
        }
    });

    $("input#type_internal").click(function(){
        isType_internalChecked = $("#type_internal")[0].checked;
        if (isType_internalChecked && isType_cloudinfraChecked) {
          $(".ICC_Type_Internal_Segmentation").show();
        } else {
          $(".ICC_Type_Internal_Segmentation").hide();
        }

        if (isType_internalChecked && isType_externalChecked) {
          $(".ICC_Type_Internal_External").show();
        } else {
          $(".ICC_Type_Internal_External").hide();
        }

        if (isType_internalChecked) {
          $(".typeInternalShow").show();
        }
    });




    //Check show if check true AND blackbox not selected 
    $("input[id='type_external'], input[id='type_web'], input[id='type_mobile_apk'], input[id='type_mobile_ipa']")
    .click(function(){
        var ifThisChecked = $(this)[0].checked;
        if (ifThisChecked) {
          $(this).siblings(".inputContainerSub").show();
          //$("#type_external_defense_none-error").nextAll(".error").hide();
          
        } else {
          $(this).siblings(".inputContainerSub").hide();
        }
    });

    //Check show if check true
    $("input[id='type_mobile'], input[id='type_internal'], input[id='type_web_api'],input[id='type_web_user_role'], input[id='type_web_has_access'],input[id='environment_live'], input[id='payment_other'], input[id='time_other'], input[id='time_outsidebusinesshours'], input[id='time_inbusinesshours'], input[id='standards_other']")
    .click(function(){
        var ifThisChecked = $(this)[0].checked;
        if (ifThisChecked) {
          $(this).siblings(".inputContainerSub").show();
          //$("#type_external_defense_none-error").nextAll(".error").hide();
          
        } else {
          $(this).siblings(".inputContainerSub").hide();
        }
    });

    
});




function activateHeaders(dataHead) {
  //currentForm(dataPage)
  formHead = currentForm(formHead);
  $(".headerSection").hide();
  $(".headerSection[data-header='" + dataHead +"']").each(function(){
      $(this).show();
  });
  $(".formHead").hide();
  $(".headerSection[data-header='" + dataHead +"']").parent(".formHead").show();


  $(".headerSection[data-header='" + dataHead +"'] a").removeClass("active");
  $(".headerSection[data-header='" + dataHead +"']").find("a[data-headerButton='" + formSection +"']").addClass("active");


}

function activateProgress(dataProgress) {
  //currentForm(dataPage)
  
  $(".progress[data-progress='" + dataProgress +"']").addClass("active");
  $(".progress[data-progress='" + dataProgress +"']").addClass("currentProgress");
  
}


function currentForm(dataPage) {
  return $(".formSection[data-section='" + formSection +"']");
}


function nextForm(nextFormPage) {
    return $(".formSection[data-section='" + nextFormPage +"']");
}

function getFields(){
  $(".formWarning").show();
  var results = [];
  $(".inputContainer > input, .inputContainer > textarea, .radioContainer > input").each(function(i) {
    if (this.type == "radio" || this.type == "checkbox" && this.checked) {
      if ($(this).is(':checked')){
        if (this.getAttribute("description").trim()=="") return;
        results.push({
            "": this.getAttribute("description") + " |-| " + this.checked,
        });
      }
    } else if (this.value && (this.type == "text" || $(this).is("textarea"))) {
      if (this.value.trim()=="") return;
      if (this.getAttribute("description").trim()=="") return;
      results.push({
          "": this.getAttribute("description") + " |-| " + this.value,
      });
    }
    
  });
  
  $(".scopeResultsDiv").html(results);

  results = JSON.stringify(results)
  results = results.split('"},{"":"').join('\n')
  .split('[').join('')
  .split(']').join('')
  .split('}').join('')
  .split('{').join('')
  .split(',').join('')
  .split('"').join('')
  .split(':').join('')
  .split('\\n').join('\n')

  results=results.replaceAll("|-|",":").trim();

  
  var MD5Result = MD5(results);
  console.log(MD5Result);
  results = results + '\n'+'resultsMD5:' + MD5Result;
  console.log(results)
  var text = results;
  var filename = "scope-form.txt"; 

  download(filename, text); 

  
}

function download(file, text) { 
    //creating an invisible element 
    var element = document.createElement('a'); 
    element.setAttribute('href',  
    'data:text/plain;charset=utf-8, ' 
    + encodeURIComponent(text)); 
    element.setAttribute('download', file); 
  
    // Above code is equivalent to 
    // <a href="path of file" download="file name"> 
  
    document.body.appendChild(element); 
  
    //onClick property 
    element.click(); 
  
    document.body.removeChild(element); 
} 

function setForm(dataPage){

  clearInterval(nextBtnInterval);
  

  var validator = currentForm(formSection).find("form").validate({
      
      groups: {
          username: "typeChecks1"
      },
      rules: {
        
        info_company: "required",
        info_address: "required",
        info_name: "required",
        info_email: {
          required: true,
          email: true
        },
        info_phone: {
            required: true,
            plus: true
        },
        "type_of_test": "required",
        external_defense1: "required",
        external_defense2: "required",
        roe_box: "required",
        type_of_environment: "required",
        payment: "required",
        payment_other_text: "required",
        access_other_text: "required",
        type_of_access: "required",
        time_testing: "required",
        time_inbusinesshours_other: "required",
        time_outsidebusinesshours_other: "required",
        time_other: "required",
        standards_other_text: "required",
        scope_targets_number:  {
          required: true,
          number: true
        },
        api_targets_number:  {
          required: true,
          number: true
        },
        scope_targets_range: "required"


      },
      messages: {
        
        info_company: "Company Name cannot be empty.",
        info_address: "Company Adress cannot be empty.",
        info_name: "Contact Name cannot be empty.",
        info_email: {
          required: "Contact e-mail address cannot be empty.",
          email: "Please enter a valid e-mail address."
        },
        info_phone: {
          required: "Contact Phone cannot be empty.",
          plus: "Phone number must include Area Code (Example +372)."
        },
        "type_of_test": "You must choose at least one of the test types.",
        external_defense1: "You must choose at least one of the options. If you have no perimeter defenses, please choose 'None'",
        external_defense2: "You must choose at least one of the options. If you have no perimeter defenses, please choose 'None'",
        roe_box: "You must choose at least one of the Rules of Engagement.",
        type_of_environment:  "You must choose one of the Environment Types.",
        payment: "You must choose one of the Payment Systems! If you don't have payment systems within scope, please choose 'None'.",
        payment_other_text: "You must specify your payment method.",
        access_other_text: "You must specify custom type of access.",
        type_of_access: "You must choose at least one Type of Access! If you don't provide any access within scope, please choose 'None'.",
        time_testing: "You must specify your applicable testing time period.",
        time_inbusinesshours_other: "You must specify your business hours.",
        time_outsidebusinesshours_other: "You must specify your outside business hours.",
        time_other_text: "You must specify.",
        standards_other_text: "You must specify your regulation.",
        scope_targets_number:  {
          number: "Must be a number.",
          required: "Cannot be empty."
        },
        api_targets_number:  {
          number: "Must be a number.",
          required: "Cannot be empty."
        },
        scope_targets_range: "Cannot be empty."

      },
      highlight: function(element, errorClass, validClass) {
        if ($(element).is("input[type='radio'], input[type='checkbox']")) {
          var inputGroup = $(element).attr("name");
          $("input[name='"+inputGroup+"']").addClass(errorClass).removeClass(validClass); // add error class to elements/remove valid class
          $("input[name='"+inputGroup+"']").addClass(errorClass); // add error class to ul element for checkbox groups and radio inputs
        } else {
           $(element).addClass(errorClass);
        }
        
      },
      unhighlight: function(element, errorClass, validClass) {
        if ($(element).is("input[type='radio'], input[type='checkbox']")) {
          var inputGroup = $(element).attr("name");
          $("input[name='"+inputGroup+"']").removeClass(errorClass).addClass(validClass); // add error class to elements/remove valid class
          $("input[name='"+inputGroup+"']").removeClass(errorClass); // add error class to ul element for checkbox groups and radio inputs
        } else {
           $(element).removeClass(errorClass);
        }
      },
      errorPlacement: function (error, element) {
          if (element.attr("type") == "checkbox") {
              error.appendTo($(element).parent().parent());
          } else if (element.attr("type") == "radio") {
              error.appendTo($(element).parents('.inputContainer'));
          } else {
              error.appendTo($(element).parent('.inputContainer'));
          } 

      }

  });


  formPageElement = currentForm(formSection).parents(".formPage")
  formPage = currentForm(formSection).parents(".formPage").data("page");

  $(".formPage").hide();
  formPageElement.show();
  $(".formNextBtn").removeClass("active")

  currentForm(formSection).find(".inputContainer input[type='text'], .inputContainer input[type='number'],.inputContainer textarea").each(function (){
      $(this).focus(function (){
          $(this).valid();
      });
  });

  jQuery.validator.addMethod('plus', function(value) { 
    return (value.match(/\+[0-9]+/)); 
  }, 'Phone number must include Area Code (Example +372)');

  nextBtnInterval = setInterval(function(){
      if (validator.checkForm()) {
         $(".formNextBtn").addClass("active")

      } else {
        $(".formNextBtn").removeClass("active")
      }
  }, 200);
}


function resizeProgressBox() {
    var formProgressBox = $(".formProgress");
    var formItself = $(".formItself");
    var progressCheck = $(".progress .progressCheck").first();



    var formItselfOffsetL = formItself.offset().left;
    var formProgressBoxW = formProgressBox.width();

    var formProgressBoxWPaddingL = parseInt(formProgressBox.css("padding-left").slice(0,-2));
    var progressCheckW = progressCheck.width();
    progressCheckW = parseInt(progressCheckW) + parseInt(progressCheck.css("border-width").slice(0,-2));

    formProgressBox.width(formItselfOffsetL + progressCheck.width() / 2 - formProgressBoxWPaddingL);

    formProgressBoxW = formProgressBox.width();

    console.log(formItselfOffsetL);
    console.log(progressCheck.width());
    console.log(formItselfOffsetL, progressCheckW, formProgressBoxWPaddingL);
    console.log(formItselfOffsetL, progressCheck, formProgressBoxWPaddingL);
}

$( window ).resize(function() {
    resizeProgressBox();
});

var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}