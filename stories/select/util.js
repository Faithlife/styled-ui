import Client from 'micro-graphql-react/lib-es5/client';
import compress from 'micro-graphql-react/lib-es5/compress';

const client = new Client({
	endpoint: 'https://www.graphqlhub.com/graphql',
});

const githubQuery = compress`
{
	github {
		repo(ownerUsername: "faithlife", name: "styled-ui") {
			name
			commits(limit: 10) {
				...commit
			}
		}
	}
}

fragment commit on GithubCommit {
	sha
	message
	author {
		... on GithubUser {
			login
			id
		}
		... on GithubCommitAuthor {
			email
		}
	}
}
`;

export const fetchCommits = async query => {
	const result = await client.runQuery(githubQuery);
	return result.data.github.repo.commits
		.filter(x => !query || x.message.toLowerCase().includes(query.toLowerCase()))
		.map(x => ({ value: x.sha, label: x.message }));
};
