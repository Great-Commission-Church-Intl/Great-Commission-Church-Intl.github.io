async function retrieveLatestCommitData() {

  let data = await axios.get('https://api.github.com/repos/Great-Commission-Church-Intl/Great-Commission-Church-Intl.github.io/commits/main')
  let commit = data.data.commit;
  let stats = data.data.stats;
  let parent = data.data.parents[0].sha;
  let id = data.data.sha;
  let url = data.data.url;
  let fileCount = data.data.files.length;

  let cdate = new Date(commit.author.date);
  let cdatestring = cdate.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

  let uri = url.replace('api.github.com/repos', 'github.com');
  uri = uri.replace('commits', 'commit');

  document.getElementById('current-revision').innerHTML = id;
  document.getElementById('parent-revision').innerHTML = parent;
  document.getElementById('commit-time').innerHTML = cdatestring;
  document.getElementById('commit').innerHTML = commit.message;
  document.getElementById('changes').innerHTML = `${fileCount} file(s) changed | <span class="add">(+) ${stats.additions} additions</span> | <span class="delete">(-) ${stats.deletions} deletions</span>`;
  document.getElementById('url').innerHTML = `<a href=${url}>View Raw Commit Data`;
  document.getElementById('uri').innerHTML = `<a href=${uri}>View Commit`;

}

window.onload = () => {
  retrieveLatestCommitData();
}
