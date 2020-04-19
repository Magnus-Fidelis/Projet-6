
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Sauces = require('../models/sauces');
const fs = require('fs');

exports.postsauces = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce)
	const token = req.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
	const userIds = decodedToken.userId;
	const sauce = new Sauces({

			imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
			likes: 0,
			dislikes: 0,
			usersliked: [],
			usersdisliked: [],
			userID: userIds,
			...sauceObject,
			
		});
		sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));

};





exports.getsauces = (req, res, next) => {
Sauces.find()
	.then(sauce_array => res.status(200).json(sauce_array))
	.catch(error => res.status(400).json({ error }));
};

exports.getsaucesbyid = (req, res, next) => {
Sauces.findOne({_id: req.params.id})
	.then(sauce_choisit => res.status(200).json(sauce_choisit))
	.catch(error => res.status(400).json({ error }));
	};
	
	
	exports.putsaucesbyid = (req, res, next) => {
		Sauces.updateOne({_id: req.params.id}, { ...req.body, _id: req.params.id})
			.then(sauce_choisit => res.status(200).json(sauce_choisit))
			.catch(error => res.status(400).json({ error }));
			}; 
			
			
	
			exports.deletesaucesbyid = (req, res, next) => {
				Sauces.findOne({ _id: req.params.id })
					.then(sauce_choisit => {
						const filename = sauce_choisit.imageUrl.split('/images/')[1];
						fs.unlink(`images/${filename}`, () => {
							Sauces.deleteOne({ _id: req.params.id })
								.then(() => res.status(200).json({ message: 'Objet supprimé !'}))
								.catch(error => res.status(400).json({ error }));
						});
					})
					.catch(error => res.status(500).json({ error }));
			};
	 

exports.likesaucebyid = (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
	const userId = decodedToken.userId;
	Sauces.findOne({_id: req.params.id})
	.then(sauce=> {

	switch(req.body.like){
		case 1:
		Sauces.updateOne({_id: req.params.id}, {$addToSet: { usersliked: userId}
		})
		.then(result => {

			if(result.nModified > 0)
			{
				Sauces.updateOne({_id: req.params.id}, {$inc: {likes: 1}
				})
					.then(() => res.status(200).json({message: 'ok'}))
					
					
				
					
			}
			else
			{
				res.status(400).json({error:"Déjà like"});
			}
		
		}
		) 

		.catch(error => {res.status(400).json({ error })
		console.log( 'erreur', error);});
		break; 
		case 0:
			const sauceObject = {
				$pull: {usersliked: userId}
			}
			Sauces.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
			.then( results => {

			if(results.nModified > 0)
			{
				const sauceObjects = {
					$pull: {usersdisliked: userId}
				}

				Sauces.updateOne({_id: req.params.id}, {...sauceObjects, _id: req.params.id, $inc: {likes: -1}})
				.then( () => {
					res.status(200).json('Dislked retiré')

				})
				.catch(error => console.log(error));
			}
			else if (results.nModified == 0)
			{
				Sauces.updateOne({_id: req.params.id}, {_id: req.params.id, $inc: {dislikes: -1}})
				.then( () => {
					res.status(200).json('like retiré')

				})
			}
			else
			{

		f
			res.status(200).json('Like retiré')}})
			.catch( error => console.log(error))
			
		break;

		case -1:
			Sauces.updateOne({_id: req.params.id}, {$addToSet: { usersdisliked: userId}
			})
			.then(results => {
				
				if(results.nModified > 0)
				{
					Sauces.updateOne({_id: req.params.id}, {$inc: {dislikes: 1}
					})
						.then(() => res.status(200).json({message: 'ok'}))
						
						
					
						
				}
				else
				{
					res.status(400).json({error:"Déjà like"});
				}
			
			}
			) 
	
			.catch(error => {res.status(400).json({ error })
			console.log( 'erreur', error);});
		break;

		default: res.status(400).json(error) 
		console.log('default')
	}})
		
		
	.catch(error => {res.status(400).json({ error })
	console.log( 'erreur', error);
});

	/*
	Sauces.findOne({_id: req.params.id})
	.then(sauce_choisit => {
		if {req.body.}
	})
	.catch(error => res.status(500).json({error}))*/	
}  