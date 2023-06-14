"use strict";

exports.ok = function (value, res) {
	var data = {
		status: 200,
		value: value,
	};
	res.json(data);
	res.end();
};

// response untuk nested matakuliah
exports.oknested = function (value, res) {
	// lakukan akumulasi
	const hasil = value.reduce((akumulasikan, item) => {
		// menentukan key group
		if (akumulasikan[item.nama]) {
			// buat variabel group
			const group = akumulasikan[item.nama];
			// cek jika isi array adalah matakuliah
			if (Array.isArray(group.matakuliah)) {
				// tambahkan value ke dalam group matakuliah
				group.matakuliah.push(item.matakuliah);
			} else {
				group.matakuliah = [group.matakuliah, item.matakuliah];
			}
		} else {
			akumulasikan[item.nama] = item;
		}
		return akumulasikan;
	}, {});
	let data = {
		status: 200,
		values: hasil,
	};

	res.json(data);
	res.end();
};
