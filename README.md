# node_message_board


### GET /messages 获取消息
如果需要jsonp 则增加callback参数
response
```json
[
{
"name": "msg0",
"content": "content0"
},
{
"name": "sam",
"content": "haode,atest"
}
]
```


### POST /messages 发送消息
content  内容
name  昵称
