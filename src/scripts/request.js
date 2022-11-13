/**
 * 请求
 */
import axios from "axios"

const baseURL = 'http://localhost:7001';

// ajax
export const request = (url, options = {}) => {
	return new Promise(async (resolve, reject) => {
		const params = options.data || {}
		// params._csrf = getCookie('csrfToken')
		try {
			let newOptions = {}
			if (options.method === 'post') {
				newOptions.data = params
			} else {
				newOptions.params = params
			}
			const axRes = await axios({
        baseURL: url.indexOf('/api') !== -1 ? undefined : baseURL,
				url,
				responseType: 'json',
				method: options.method || 'get',
				...newOptions,
				headers: {
          'Content-Type': 'application/json'
        }
			})
			const { status, data } = axRes
			if (status >= 200 && status < 300) {
				resolve(data)
			} else {
				reject(axRes)
			}
		} catch (e) {
			reject(e)
		}
	})
}