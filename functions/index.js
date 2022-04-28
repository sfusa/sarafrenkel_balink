const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const app = express();

// Persons
app.get('/person/:id', async (req, res) => {
  const snapshot = await db.collection('persons').doc(req.params.id).get();
  const personId = snapshot.id;
  const personData = snapshot.data();
  res.status(200).send(JSON.stringify({id: personId, ...personData}));
});

app.post('/person', async (req, res) => {
  const person = req.body;
  await db.collection("persons").add(person);
  res.status(201).send();
});

app.delete('/person/:id', async (req, res) => {
  await db.collection('persons').doc(req.params.id).delete();
  res.status(200).send();
});

// Animals
app.get('/animal/:id', async (req, res) => {
  const snapshot = await db.collection('animals').doc(req.params.id).get();
  const animalId = snapshot.id;
  const animalData = snapshot.data();
  res.status(200).send(JSON.stringify({id: animalId, ...animalData}));
});

app.post('/animal', async (req, res) => {
  const animal = req.body;
  await db.collection("animals").add(animal);
  res.status(201).send();
});

app.put('/animal/:id', async (req, res) => {
  const body = req.body;
  await db.collection('animals').doc(req.params.id).update(body);
  res.status(200).send();
});

// Membership
app.get('/membership/:personId', async (req, res) => {
  const snapshot = await db.collection('membership').where("personId", "==", req.params.personId).get();
  let relationships = [];
  snapshot.forEach((rel) => {
    let id = rel.id;
    let data = rel.data();
    relationships.push({id, ...data});
  });
  res.status(200).send(JSON.stringify(relationships));
});

app.post('/membership/:personId/:animalId', async (req, res) => {
  const snapshot = await db.collection('membership').where("animalId", "==", req.params.animalId).get();
  if (snapshot.size > 0) {
    res.status(501).send({message: "This animal already belongs to a person."});
  } else {
    await db.collection("membership").add({"personId": req.params.personId, "animalId": req.params.animalId});
    res.status(201).send();
  }
});

exports.api = functions.https.onRequest(app);
