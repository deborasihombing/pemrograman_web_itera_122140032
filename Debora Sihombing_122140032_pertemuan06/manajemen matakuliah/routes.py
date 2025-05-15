def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')

    # ✅ Tambahkan ini untuk API matakuliah
    config.add_route('matakuliah_list', '/matakuliah')        # untuk GET dan POST
    config.add_route('matakuliah_detail', '/matakuliah/{id}') # untuk GET, PUT, DELETE