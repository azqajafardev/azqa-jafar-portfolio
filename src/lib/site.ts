export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')).replace(/\/$/, '');
export const profile = {
  name: 'Azqa Jafar', email: 'azqajafar@gmail.com', phone: '03166424174',
  github: 'https://github.com/azqajafardev', linkedin: 'https://linkedin.com/in/azqa-jafar',
  publication: 'https://www.sciencedirect.com/science/article/pii/S2090447926004843',
  paper: 'Hierarchical Deep Learning with Stability-Driven Normalization and Regularization for Accurate Multi-Class Diabetic Retinopathy Diagnosis',
};
