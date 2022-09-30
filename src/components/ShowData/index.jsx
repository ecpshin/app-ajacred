import "./styles.css";

export default function ShowData({ label, dado }) {
	return (
		<div className='tag-group'>
			<h5 className='titulos'>{label}</h5>
			<span className='tags'>{dado}</span>
		</div>
	);
}
