var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;
const { EMAIL_API_KEY } = process.env;
// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = EMAIL_API_KEY;

// Uncomment below two lines to configure authorization using: partner-key
// var partnerKey = defaultClient.authentications['partner-key'];
// partnerKey.apiKey = 'YOUR API KEY';

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
exports.sendEmail = (toEmail, link) => {
    sendSmtpEmail = {
        to: [
            {
                email: toEmail,
            },
        ],
        templateId: 1,
        params: {
            verifyLink: link,
        },
        headers: {
            'X-Mailin-custom':
                'custom_header_1:custom_value_1|custom_header_2:custom_value_2',
        },
    };

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
        (data) => {
            console.log(
                'API called successfully. Returned data: ' +
                    JSON.stringify(data, null, 2)
            );
        },
        (error) => {
            console.error(error);
        }
    );
};
