
const {ccclass, property} = cc._decorator;

@ccclass
export default class NetWork extends cc.Component {

    @property(cc.Node) Btn_Connect: cc.Node | undefined = undefined;
    onLoad () {
        this.Btn_Connect.on(cc.Node.EventType.TOUCH_END, () => {
            this.sendPostRequest();
        },this);
    }

    start () {

    }


    /**
     * param:XMLHttpRequest通信
     * **/
    //get网络通信
    public netWorkData() : void {
        const url = 'http://127.0.0.1:3000/fetch'; // 示例 URL

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // 请求完成
                if (xhr.status === 200) { // 请求成功
                    const response = JSON.parse(xhr.responseText);
                    console.log('GET 请求成功，响应数据：', response);
                } else {
                    console.error('GET 请求失败，状态码：', xhr.status);
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    }

    //post网络通信
    public postNetWorkData() : void {
        const url = 'http://127.0.0.1:3000/uploadDataResult'; // 示例 URL
        const data = {
            name:"cocos",
            age:18
        };
    
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // 请求完成
                if (xhr.status === 200) { // 请求成功
                    const response = JSON.parse(xhr.responseText);
                    console.log('POST 请求成功，响应数据：', response);
                } else {
                    console.error('POST 请求失败，状态码：', xhr.status);
                }
            }
        };
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }


    /**
     * param:fetch通信
     * **/
    //get网络通信
    public async fetchUserData() : Promise<void> {
        try {
            const url = 'http://127.0.0.1:3000/fetch'; // 示例 URL
            // 发送请求并等待响应
            const response = await fetch(url);
    
            // 检查响应是否成功
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            // 解析响应为 JSON 格式
            const data = await response.json();
    
            // 打印结果到控制台
            console.log("请求成功，返回的data:", data);
        } catch (error) {
            // 处理错误
            console.error("请求失败:", error);
        }
    }

    //post网络通信
    public async sendPostRequest(): Promise<void> {
        const url = 'http://127.0.0.1:3000/uploadDataResult'; // 示例 URL
        const postData = {
            name:"cocos",
            age:36
        };
    
        try {
            const response = await fetch(url, {
                method: "POST",  // POST 请求
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)  // 将对象转换成 JSON 字符串
            });
    
            if (!response.ok) {
                throw new Error("请求失败，状态码: " + response.status);
            }
    
            const data = await response.json();
            console.log("POST 请求成功，返回的data:", data);
        } catch (error) {
            console.error("请求失败:", error);
        }
    }





}
