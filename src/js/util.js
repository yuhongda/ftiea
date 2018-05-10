export function getGeoCoordMap(){
    return {
        '北京': [116.4551, 40.2539],
        '天津': [117.4219, 39.4189],
        '上海': [121.4648, 31.2891],
        '重庆': [107.7539, 30.1904],
        '河北': [114.4995, 38.1006],
        '河南': [113.4668, 34.6234],
        '云南': [102.9199, 25.4663],
        '辽宁': [123.1238, 42.1216],
        '黑龙江': [127.9688, 45.368],
        '湖南': [113.0823, 28.2568],
        '安徽': [117.29, 32.0581],
        '山东': [117.1582, 36.8701],
        '新疆': [87.9236, 43.5883],
        '江苏': [118.8062, 31.9208],
        '浙江': [119.5313, 29.8773],
        '江西': [116.0046, 28.6633],
        '湖北': [114.3896, 30.6628],
        '广西': [108.479, 23.1152],
        '甘肃': [103.5901, 36.3043],
        '山西': [112.3352, 37.9413],
        '内蒙古': [111.4124, 40.4901],
        '陕西': [109.1162, 34.2004],
        '吉林': [125.8154, 44.2584],
        '福建': [119.4543, 25.9222],
        '贵州': [106.6992, 26.7682],
        '广东': [113.5107, 23.2196],
        '青海': [101.4038, 36.8207],
        '西藏': [91.1865, 30.1465],
        '四川': [103.9526, 30.7617],
        '宁夏': [106.3586, 38.1775],
        '海南': [110.3893, 19.8516],
        '台湾': [121.509062, 25.044332],
        '香港': [114.171994, 22.281089],
        '澳门': [113.549403, 22.192961],


        '呼和浩特': [111.4124,40.4901],
        '包头': [110.3467,41.4899],
        '乌海':[106.831999,39.683177],
        '鄂尔多斯': [108.9734,39.2487],
        '巴彦淖尔':[107.423807,40.76918],
        '乌兰察布':[113.112846,41.022363],
        '锡林郭勒盟': [116.07, 43.95],
        '阿拉善盟': [105.67, 38.83],

        '呼伦贝尔': [119.77, 49.22],
        '兴安盟': [122.05, 46.08],
        '通辽': [122.16, 43.37],
        '赤峰': [118.92, 42.27],
      }
  }

export function thousands(val) { 
    var aIntNum = val.toString().split("."); if (aIntNum[0].length >= 5) { aIntNum[0] = aIntNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); } if (aIntNum[1] && aIntNum[1] >= 5) { aIntNum[1] = aIntNum[1] ? aIntNum[1].replace(/\B(?=(\d{3})+(?!\d))/g, " ") : " "; } return aIntNum.join("."); 
}

export function ellipsis(str, limit){
    var w = 0, len = str.length;

    for (var i=0; i < len; i++) {
        var c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) w++;
        else w+=2;

        if (w > limit) {
            str = str.substr(0,i);// + "...";
            break;
        }
    }
    
    return str;
}

export function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

export function objectToQueryString(params) {
    let paramsQueryStringArray = []
    for (const key of Object.keys(params)) {
      if (params[key] === undefined) {
        continue;
      }

      paramsQueryStringArray.push(`${key}=${params[key]}`);
    }
    return paramsQueryStringArray.join('&')
}
