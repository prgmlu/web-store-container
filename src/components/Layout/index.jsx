import React, { useEffect, useState } from 'react';
import './layout.scss';
import { Button, Carousel, Col, Container, Image, Modal, ProgressBar, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getProductData } from '../../apis/webStoreAPI';
import { formURL } from '../../utils/apiUtils';

class ProductData {
	name = '';
	sku = '';
	carouselImages = '';
	detailsBody1 = '';
	locale = '';
	price = null;
	priceCurrency = '';
	pricePrefix = '';
	priceSuffix = '';
	url = '';

	async map(productData = {}) {
		console.log('=> map', productData);
		this.name = productData.name;
		this.sku = productData.sku;
		this.url = formURL(productData.url);
		this.carouselImages = productData?.carousel_images?.carousel?.map((imgUrl) =>
			formURL(imgUrl),
		);
		this.detailsBody1 = productData.details_body_1;
		this.locale = productData.locale;
		this.price = productData.price;
		this.priceCurrency = productData.price_currency;
	}
}

const ProductModalContent = ({ productData }) => {
	return (
		<Container>
			<Row style={{ justifyContent: 'center' }}>{productData.name}</Row>
			<Row style={{ justifyContent: 'center' }}>{productData.sku}</Row>
			<Row
				style={{ justifyContent: 'center' }}
			>{`${productData.priceCurrency} ${productData.price}`}</Row>
			<Row>
				<Carousel>
					{productData.carouselImages?.map((imgUrl) => (
						<Carousel.Item key={imgUrl}>
							<Image src={imgUrl} thumbnail />
						</Carousel.Item>
					))}
				</Carousel>
			</Row>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Button
					onClick={() => {
						window.open(productData.url, 'window');
					}}
				>
					BUY NOW
				</Button>
			</div>
		</Container>
	);
};

ProductModalContent.propTypes = {
	productData: PropTypes.instanceOf(ProductData).isRequired,
};

const ProductModal = ({ storeId, onHide, data }) => {
	const [productData, setProductData] = useState(null);

	useEffect(() => {
		getProductData(storeId, data.product_sku).then((res) => {
			const newProductData = new ProductData();
			newProductData.map(res).then(() => {
				console.log('=>', newProductData);
				setProductData(newProductData);
			});
		});
	}, []);

	return (
		<Modal show centered onHide={onHide}>
			{productData ? <ProductModalContent productData={productData} /> : <ProgressBar />}
		</Modal>
	);
};

const HotspotClickHandler = () => {
	const [modalComponent, setModalComponent] = useState(null);

	const onOpenProductModal = (data) => {
		setModalComponent(<ProductModal onHide={() => setModalComponent(null)} data={data} />);
	};
	window.addEventListener('openProductModal', (evt) => {
		onOpenProductModal(evt.data);
	});

	return modalComponent;
};

const Layout = ({ children }) => {
	useEffect(() => {
		// initialize materialize
	});

	return (
		<>
			{children}
			<div className="topUILayer">{/* <TopNavBar/> */}</div>
			<HotspotClickHandler />
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.any.isRequired,
};

export default Layout;
