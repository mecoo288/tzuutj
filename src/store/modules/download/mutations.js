const DONE_downLoad = (scope, {that, message, title = "导出提示", type = 51000}) => {
	that.$confirm(message, title, {
		confirmButtonText: '前往下载中心',
		cancelButtonText: '我知道了',
		type: 'success'
	}).then(() => {
		that.$router.push({path:"/download/" + type});
	}).catch(() => {
	});
}
export default {
	DONE_downLoad
}