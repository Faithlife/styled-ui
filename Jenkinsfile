#!groovy​
@Library('FlowdockNotifier') _

isPr = env.JOB_NAME == 'FaithlifeEquipment-PR'

def setGitHubStatus(buildName, state, message = '') {
	def sha1 = isPr ? ghprbActualCommit : sh(returnStdout: true, script: 'git rev-parse HEAD')
	step([
		$class: 'GitHubCommitStatusSetter',
		commitShaSource: [$class: 'ManuallyEnteredShaSource', sha: "${sha1}"],
		reposSource: [$class: 'ManuallyEnteredRepositorySource', url: "https://git.faithlife.dev/Logos/FaithlifeEquipment" ],
		contextSource: [$class: 'ManuallyEnteredCommitContextSource', context: buildName],
		statusResultSource: [$class: 'ConditionalStatusResultSource',
		results: [[$class: 'AnyBuildResult', message: message, state: state]]]
	])
}

flowdock.withNotification('a611b96b1517142a58a87c1b58aacdd8', '#build') {
	node('com-dev-docker01') {
		def buildResult = 'FAILURE'
		try {
			stage('Checkout') {
				checkout scm
			}

			setGitHubStatus('Build', 'PENDING', 'Building')
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

			buildResult = 'SUCCESS'
			setGitHubStatus('Build', buildResult)

			if (!isPr) {
				withCredentials([
					string(credentialsId: '6e22d829-5047-4509-b8d8-9f3ed6ff6bfa', variable: 'GH_TOKEN'),
				]) {
					stage('Publish') {
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
					stage('Deploy Storybook'){
						sh script: 'git push origin :gh-pages'
						sh script: 'yarn run deploy-storybook --ci'
					}
				}
				stage('CrowdIn Upload'){
					sh script: 'yarn run crowdin-upload'
				}
			}

		} catch(Exception e) {
			buildResult = 'FAILURE'
		} finally {
			setGitHubStatus('Build', buildResult)
		}
	}
}
