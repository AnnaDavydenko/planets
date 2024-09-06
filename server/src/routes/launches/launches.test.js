import request from 'supertest';
import { app } from '../../app.js';
import { mongoConnect, mongoDisconnect } from "../../services/mongo.js";

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
      const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('Test POST /launch', () => {
    const launchDataMock = {
      mission: '123F',
      rocket: 'falcone',
      destination: 'Kepler-62 f',
      launchDate: 'January 17, 2028',
    };

    const launchDataWithoutDateMock = {
      mission: '123F',
      rocket: 'falcone',
      destination: 'Kepler-62 f',
    };

    const launchDataWithInvalidDateMock = {
      mission: '123F',
      rocket: 'falcone',
      destination: 'Kepler-62 f',
      launchDate: 'new date',
    };

    test('It shlould respond with 201 created', async () => {
      const response = await request(app)
        .post('/launches')
        .send(launchDataMock)
        .expect('Content-Type', /json/)
        .expect(201);

      const requestDate = new Date(launchDataMock.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(response.body).toMatchObject(launchDataWithoutDateMock);
      expect(requestDate).toBe(responseDate);
    });

    test('It shlould catch missing required properties', async () => {
      const response = await request(app)
        .post('/launches')
        .send(launchDataWithoutDateMock)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Missing required launch property (mission, rocket, launchDate or destination)',
      });


    });

    test('It shlould catch invalid dates', async () => {
      const response = await request(app)
        .post('/launches')
        .send(launchDataWithInvalidDateMock)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Invalid launch date',
      });
    });
  });
})
