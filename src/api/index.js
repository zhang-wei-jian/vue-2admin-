import ajax from './ajax';
import openAi from './openAi';
import axios from 'axios';

export const reqTmList = (page, limit) => {
  return ajax({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
  });
};

export const reqAddOrEdit = (tm) => {
  if (tm.id) {
    return ajax({
      //有id就是修改
      url: `/admin/product/baseTrademark/update`,
      method: 'put',
      data: tm,
    });
  } else {
    return ajax({
      url: `/admin/product/baseTrademark/save`,
      method: 'post',
      data: tm,
     
    });
  }
};
export const reqDeleteTm = (id) => {
  return ajax({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete',
  });
};
export const reqYiYan = () => {
  return axios({
    url: `https://v1.hitokoto.cn/`,
    method: 'get',
  });
};
const apiKey = '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';
// export const reqOpenAi = (prompt) => {
//   return openAi.post(
//     // 'https://api.openai.com/v1/engines/davinci-codex/completions',
//     'https://api.openai.com/v1/completions',
//     {
//       // prompt: 'What is the capital of China?',
//       // engine: 'davinci-codex',
//       // temperature: 0.7
//       model: 'text-davinci-003',
//       prompt: String(prompt),
//       max_tokens: 150,
//       // temperature: 0,
//       // top_p: 1,
//       // n: 1,
//       // stream: true,
//       // logprobs: null,
//       // stop: '\n',
//     },
//     // { headers: { Authorization: `Bearer ${apiKey}` } }
//   );
// };
export const reqOpenAi = (prompt) => {
  // return openAi.post(
  //   // 'https://api.openai.com/v1/engines/davinci-codex/completions',
  //   'https://api.openai.com/v1/completions',
  //   {
  //     // prompt: 'What is the capital of China?',
  //     // engine: 'davinci-codex',
  //     // temperature: 0.7
  //     model: 'text-davinci-003',
  //     prompt: String(prompt),
  //     max_tokens: 150,
  //     // temperature: 0,
  //     // top_p: 1,
  //     // n: 1,
  //     // stream: true,
  //     // logprobs: null,
  //     // stop: '\n',
  //   },
  //   // { headers: { Authorization: `Bearer ${apiKey}` } }
  // );
  return openAi({
    url:'https://api.openai.com/v1/completions',
    method:'post',
    data:{
      // prompt: 'What is the capital of China?',
      // engine: 'davinci-codex',
      // temperature: 0.7
      model: 'text-davinci-003',
      prompt: String(prompt),
      max_tokens: 120,
      // temperature: 0,
      // top_p: 1,
      // n: 1,
      // stream: true,
      // logprobs: null,
      // stop: '\n',
    },
  })
};

