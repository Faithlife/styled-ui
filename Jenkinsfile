#!groovy​
@Library('FlowdockNotifier') _
flowdock.withNotification('a611b96b1517142a58a87c1b58aacdd8', '#build') {
	node('com-dev-docker01') {
		stage('Checkout') {
			checkout scm
		}

		stage('Clean') {
			sh script: 'yarn clean'
		}

		stage('Get dependencies') {
			sh script: 'yarn'
		}

		stage('Lint') {
			sh script: 'yarn lint'
		}

		stage('Test') {
			sh script: 'yarn test'
		}

		stage('Build') {
			sh script: 'yarn build'
		}

		stage('Publish') {
			withCredentials([
				string(credentialsId: '6e22d829-5047-4509-b8d8-9f3ed6ff6bfa', variable: 'GH_TOKEN'),
			]) {
				withEnv([
					"NODE_TLS_REJECT_UNAUTHORIZED=0",
					"GHE_API_URL=https://git/api/v3",
					"GHE_VERSION=2.16",
					"EMAIL=autobuild@logos.com",
					"GIT_AUTHOR_NAME=AutoBuild"
				]) {
					sh script: 'yarn run publish'
				}
			}
		}
	}
}
