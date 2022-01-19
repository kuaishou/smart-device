import mergeOptions from '../utils/mergeOptions'

 const minFetch = (config) => {
    config = mergeOptions({
        method: 'get',
        success: function () { },
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        error: function () { }
    }, config);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        var status = xhr.status;
        if (xhr.readyState == 4) {
            if (status == 200) {
                let text = xhr.response;
                try {
                    text = JSON.parse(text)
                } catch (error) {

                }
                config.success(text);
            }
        }
    }
    if ('application/json' === config.header["content-type"]) {
        config.data = JSON.stringify(config.data);
    } else {
        config.data = serialize(config.data)
    }
    if (config.params) {
        if (config.url.indexOf('?') > -1) {
            config.url = `${config.url}&${serialize(config.params)}`
        } else {
            config.url = `${config.url}?${serialize(config.params)}`
        }

    }

    xhr.open(config.method, config.url);
    xhr.setRequestHeader("Content-Type", config.header["content-type"]);
  
    xhr.send(config.data);
    
}
function serialize(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    return arr.join("&");
}
export default minFetch