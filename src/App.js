import './App.css';
import { useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function App() {
	const [crop, setCrop] = useState();
	const [src, setSrc] = useState();
	const [srcCrop, setSrcCrop] = useState(null);

	// function readImage(input) {
	// 	// 인풋 태그에 파일이 있는 경우
	// 	if (input.files && input.files[0]) {
	// 		// 이미지 파일인지 검사 (생략)
	// 		// FileReader 인스턴스 생성
	// 		const reader = new FileReader();
	// 		// 이미지가 로드가 된 경우
	// 		reader.onload = (e) => {
	// 			const previewImage = document.getElementById('preview-image');
	// 			previewImage.src = e.target.result;
	// 		};
	// 		// reader가 이미지 읽도록 하기
	// 		reader.readAsDataURL(input.files[0]);
	// 	}
	// }

	function onImageLoad(e) {
		const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

		const crop = centerCrop(
			makeAspectCrop(
				{
					// You don't need to pass a complete crop into
					// makeAspectCrop or centerCrop.
					unit: '%',
					width: 90,
					height: 90,
				},
				3 / 3,
				width,
				height
			),
			width,
			height
		);

		setCrop(crop);
	}

	// const makeClientCrop = async (crop) => {
	// 	if ((image, crop.width && crop.height)) {
	// 		const croppedImg = await getCroppedImg(image, crop, 'newFile.jpeg');
	// 		setCroppedImageUrl(croppedImg);
	// 	}
	// };

	const downloadURI = (uri, name = '금쪽같은 댕냥이') => {
		var link = document.createElement('a');
		link.download = name;
		link.href = uri;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		// delete link;
	};

	const getCroppedImg = (sourceImage, crop, fileName = 'newFile.jpeg') => {
		const canvas = document.createElement('canvas');
		console.log('!!!!!!!', sourceImage.naturalWidth);
		const scaleX = sourceImage.naturalWidth / sourceImage.width;
		const scaleY = sourceImage.naturalHeight / sourceImage.height;
		canvas.width = crop.width;
		canvas.height = crop.height;
		const ctx = canvas.getContext('2d');

		ctx.drawImage(
			sourceImage,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		);
		const cropBase64 = canvas.toDataURL();

		console.log('cropBase64>>', cropBase64);
		setSrcCrop(cropBase64);
		// try {
		// 	return new Promise((resolve) => {
		// 		canvas.toBlob((file) => {
		// 			resolve(URL.createObjectURL(file));
		// 		}, 'image/jpeg');
		// 	});
		// } catch (error) {
		// 	console.log(error);
		// 	return null;
		// }
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<p>Edit Test</p>
				<input
					type='file'
					id='camera'
					name='camera'
					capture='camera'
					accept='image/*'
					onChange={(e) => {
						e.preventDefault();
						console.log('file>>', e.target.files);
						let reader = new FileReader();
						let file = e.target.files[0];

						reader.onloadend = () => {
							console.log('reader>>', reader.result);
							setSrc(reader.result);
						};
						reader.readAsDataURL(file);
					}}
				/>
				<input
					type='file'
					id='camera'
					name='camera'
					// capture='camera'
					accept='image/*'
					onChange={(e) => {
						e.preventDefault();
						console.log('file>>', e.target.files);
						let reader = new FileReader();
						let file = e.target.files[0];

						reader.onloadend = () => {
							console.log('reader>>', reader.result);
							setSrc(reader.result);
						};
						reader.readAsDataURL(file);
					}}
				/>
				{srcCrop ? (
					<img src={srcCrop} className='crop-img' />
				) : (
					<ReactCrop
						minWidth={100}
						crop={crop}
						aspect={1}
						onChange={(c) => setCrop(c)}
						circularCrop={true}
						onComplete={(crop) => {
							console.log('onComplete>>>', crop);
						}}
					>
						<img src={src} id='preview-image' onLoad={onImageLoad} />
					</ReactCrop>
				)}
				<button
					onClick={() => {
						const previewImage = document.getElementById('preview-image');
						getCroppedImg(previewImage, crop);
					}}
				>
					crop
				</button>
				<button
					onClick={() => {
						if (srcCrop) downloadURI(srcCrop);
					}}
				>
					download
				</button>
			</header>
		</div>
	);
}

export default App;
