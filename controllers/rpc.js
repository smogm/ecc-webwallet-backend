const { stringToBoolean } = require('../modules/utils');
const config = require('../config');
const client = config.rpcClient;

exports.sendrawtransaction = (req, res) => {
  const raw = req.body.raw;
  const allowhighfees = stringToBoolean(req.body.allowhighfees);

  console.log(raw);
  console.log(allowhighfees);
  if (!raw) return res.status(400).send({ result: 'error', message: 'Empty raw data!' });

  try {
    console.log("calling wallet");
    return client.call('sendrawtransaction', [raw, allowhighfees], (err, result) => {
      console.log(err);
      console.log(result);
      if (err) return res.status(400).send({ result: 'error', message: 'Error occured while sending raw transaction', error: err.error });
      return res.status(200).send({ result: 'ok', data: result });
    });
  } catch (error) {
    return res.status(400).send({ result: 'error', message: 'Rpc call error', error });
  }
};
