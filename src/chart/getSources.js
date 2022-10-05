/**
 * Return an array of distinct source objects {name, synopsis, backgroundColor}.
 */
const backgroundColors = [ '#900', '#090', '#009', '#990', '#909', '#099', '#360', '#306', '#036', '#000' ];
export default function getSources(results) {
    const sources = [];
    const names = [];
    var i = -1;
    // spin through the results to accumulate distinct sources
    results.forEach(result => {
        const name = result.sample.source.primaryIdentifier;
        if (!names.includes(name)) {
            i++;
            names.push(name);
            sources.push({
                name: result.sample.source.primaryIdentifier,
                synopsis: result.sample.source.synopsis,
                backgroundColor: backgroundColors[i]
            });
        }
    });
    return sources;
}
